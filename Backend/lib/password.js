const bcrypt = require('bcryptjs');


exports.hashPassword = async (pass) => {
    const hashpass = await bcrypt.hash(pass, 10);
    return hashpass;
};


exports.matchPassword = async (userPass, hashPass) => {
    const hashpass = await bcrypt.compare(userPass, hashPass)
    return hashpass;
};


