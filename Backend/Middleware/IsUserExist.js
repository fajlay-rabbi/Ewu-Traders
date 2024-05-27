const user = require('.././Model/user');

const IsUserExist = async (req, res, next) => {

    const email = req.body.JSONUserData.users[0].Email;

    // try {
    //     user.findAll({
    //         where: {
    //             email: email,
    //         }
    //     }).then(u => {
    //             res.send("exist");
    //             console.log("😒 : " + u);
    //     }).catch((err) => {
    //         next();
    //     })

    // }
    //  catch (e) {
    //     res.send("failed");
    // }



    try {
        const u = await user.findOne({
            where: {
                email: email,
            },
        });

        if (u != null) {
            res.send("exist");
        }else{
            throw new Error("User not found");
        }
        // console.log("😒 : " + u);
        
    } catch (error) {
        next();
    }
};


module.exports = IsUserExist;