const jwt = require('jsonwebtoken');

exports.createToken = (email) => {
    const token = jwt.sign({ Email: email }, "mySecretkeyIsCse412RiponSirProject", {
        expiresIn: "1d"
    });
    return token;
}


exports.verifyToken = (userJWT) => {
    const userIsverify = jwt.verify(userJWT, "mySecretkeyIsCse412RiponSirProject");
    return userIsverify.Email;
}