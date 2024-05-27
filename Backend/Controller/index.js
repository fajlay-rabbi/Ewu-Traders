const password = require('../lib/password');
const user = require('.././Model/user');
const jwt = require('../lib/jwt');
const cookie = require('cookie');
const passwordChecker = require('../lib/password');

const emailHandler = require('../lib/email');


const convo = require('../Model/conversation');
const chat = require('../Model/message');
const sellPost = require('../Model/sellPost');
const reqPost = require('../Model/reqPost');
const lostPost = require('../Model/lostpost');


const { Op } = require('sequelize');



exports.home = (req, res, next) => {
    res.send("From Controllers")
}




exports.signUp = async (req, res, next) => {
    const name = req.body.JSONUserData.users[0].Name;
    const email = req.body.JSONUserData.users[0].Email;
    const pass = req.body.JSONUserData.users[0].Password;
    const HashPass = await password.hashPassword(pass);
    const token = jwt.createToken(email)

    var minm = 1000;
    var maxm = 9999;
    const OTP = Math.floor(Math.random() * (maxm - minm + 1)) + minm;

    user.create({
        name: name,
        email: email,
        password: HashPass,
        image: null,
        otp: OTP

    }).then((res) => {

        console.log("😒 USER CREATED*");

    }).catch((err) => {

        res.send("failed");

    })

    res.cookie("jwt", token, {

        expires: new Date(Date.now() + 30000000),
        httpOnly: true

    });



    // Sending otp
    const myOTP = `Your email verification code: ${OTP}`;
    try {
        console.log("Sending Email...");
        const send = emailHandler.sendEmail(email, myOTP);
    }
    catch (error) {
        console.log(error);
    }

    res.status(200).send("created");

}


exports.checkOtp = async (req, res, next) => {
    const OTP = req.body.JSONUserData.users[0].otp;
    const email = req.userEmail;

    try {
        user.findOne({
            where: {
                email: email,
            },
        }).then(async (user) => {
            if (user) {
                const userOTP = user.otp;
                if (userOTP == OTP) {
                    res.status(200);
                    res.send("success");
                } else {
                    res.send("wrong_otp");
                }
            } else {
                throw new Error("No user found!");
            }
        }).catch(error => {
            console.log(error);
        });

    } catch (error) {
        console.log(error);
    }
}

exports.resendOtp = async (req, res, next) => {
    var minm = 1000;
    var maxm = 9999;
    const OTP = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    const email = req.userEmail;

    try {
        user.findOne({
            where: {
                email: email,
            },
        }).then((user) => {
            if (user) {

                user.otp = OTP;
                return user.save();
            }
        }).then((user) => {

            res.status(200);
            res.send("success");

        }).catch(error => {
            console.log(error);
        });

    } catch (error) {
        console.log(error);
    }
}




exports.signIn = async (req, res, next) => {

    const email = req.body.JSONUserData.users[0].Email;
    const pass = req.body.JSONUserData.users[0].Password;
    const token = jwt.createToken(email)


    try {
        user.findOne({
            where: {
                email: email,
            },
        }).then(async (user) => {
            if (user) {
                const hashPassword = user.password;
                const isValid = await passwordChecker.matchPassword(pass, hashPassword);

                if (isValid) {
                    res.cookie("jwt", token, {
                        expires: new Date(Date.now() + 30000000),
                        httpOnly: true
                    });
                    res.status(200);
                    res.send("success");
                } else {
                    res.send("wrong_password");
                }
            } else {
                throw new Error("No user found!");
            }
        }).catch(error => {
            res.send("wrong_email");
        });

    } catch (error) {
        res.send("wrong_email");
        console.log("wrong email")
    }
}


exports.logout = async (req, res, next) => {
    try {
        res.clearCookie("jwt")
        // res.redirect('http://localhost:3000/signIn')
        res.status(200);
        res.send("success");
    } catch (error) {
        console.log(error);
    }
}


exports.conversation = async (req, res, next) => {
    const email = req.userEmail;

    try {
        convo.findAll({
            where: {
                email: {
                    [Op.not]: email,
                },
            },
        }).then((results) => {

            const uniqueValues = results.map(result => result.dataValues);

            // Send the unique values as the response
            res.json(uniqueValues);




        }).catch((err) => {
            console.log("Failed to find conversation: " + err);
        });


    } catch (error) {
        console.log("Couldn't retrieve conversation! ;(");
    }
}


exports.chat = async (req, res, next) => {

    const email = req.userEmail;

    const { param1, param2 } = req.query;

    try {
        user.findAll({
            where: {
                email: email,
            }
        }).then((user) => {

            chat.findAll({
                where: {
                    [Op.or]: [
                        {
                            sender: param1,
                            receiver: user[0].name,
                        },
                        {
                            sender: user[0].name,
                            receiver: param1,
                        }
                    ]
                }

            }).then((results) => {
                res.json(results);
            }).catch((err) => {
                console.log("Failed to find chats: " + err);
            });

            console.log("user: "+ user[0].name );

        }).catch((err) => {
            console.log("Can't find user: " + err);
        })

    } catch (error) {
        console.log("Couldn't retrieve chats! ;(");
    }
}

exports.user = async (req, res, next) => {
    const email = req.userEmail;
    try {
        user.findAll({
            where: {
                email: email,
            }
        }).then((user) => {
            res.json(user);
        }).catch((err) => {
            console.log("Can't find user");
        })
    } catch (error) {
        console.log("user: " + error);
    }
}

exports.createPost = async (req, res, next) => {
    const { title, price,  user } = req.body;
    const { filename } = req.file;
    const email = req.userEmail;

    try {
        sellPost.create({
            image: filename,
            title: title,
            price: price,
            status: "available",
            owner: user,
            email: email
        }).then((re) => {
            console.log("Post created successfully!");
            res.send('Success');
        }).catch((err) => {
            console.log("error creating post: " + err.message);
        })
    } catch (error) {
        console.log("Can't create post!");
    }
}

exports.FetchAllsellPost = async (req, res, next) =>{
    try {
        sellPost.findAll().then((results) =>{
            res.json(results);
        }).catch((err) =>  {console.log(err);})
    } catch (error) {
        console.log(error);
    }
}

exports.createRequest = async (req, res, next) => {
    const { title} = req.body;
    const { filename } = req.file;
    const email = req.userEmail;

    // user[0].name

    try {
        user.findAll({
            where: {
                email: email,
            }
        }).then((user) => {
            reqPost.create({
                image: filename,
                title: title,
                status: "available",
                owner: user[0].name,
                email: email

            }).then((re) => {
                console.log("Post created successfully!");
                res.send('Success');
            }).catch((err) => {
                console.log("error creating post: " + err.message);
            });
        }).catch((err) => {
            console.log("Can't find user: " + err);
        })

    } catch (error) {
        console.log("Can't create post: " + error);
    }


}

exports.FetchAllreqPost = async (req, res, next) => {
    try {
        reqPost.findAll().then((results) => {
            res.json(results);
        }).catch((err) => { console.log(err); })
    } catch (error) {
        console.log(error);
    }
}


exports.createLost = async (req, res, next) => {
    const { title } = req.body;
    const { filename } = req.file;
    const email = req.userEmail;

    // user[0].name

    try {
        user.findAll({
            where: {
                email: email,
            }
        }).then((user) => {
            lostPost.create({
                image: filename,
                title: title,
                status: "available",
                owner: user[0].name,
                email: email

            }).then((re) => {
                console.log("Post created successfully!");
                res.send('Success');
            }).catch((err) => {
                console.log("error creating post: " + err.message);
            });
        }).catch((err) => {
            console.log("Can't find user: " + err);
        })
    } catch (error) {
        console.log("Can't create post: " + error);
    }
}



exports.FetchAllLostPost = async (req, res, next) => {
    try {
        lostPost.findAll().then((results) => {
            res.json(results);
        }).catch((err) => { console.log(err); })
    } catch (error) {
        console.log(error);
    }
}