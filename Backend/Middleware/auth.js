// const generateToken = require('../util/generateToken');
const tok = require("../lib/jwt");


const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = tok.verifyToken(token);

        if (verifyUser != null) {
            req.userEmail = verifyUser;
            next();
        }else{
            res.send("unauthorized")
        }
        
    } catch (e) {
        res.send("unauthorized")
    }

};


module.exports = auth;