const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sheikhshovono6@gmail.com',
        pass: 'flmntvvpqqdstupd'
    }
});


exports.sendEmail = (email, otp) => {
    var mailOptions = {
        from: 'sheikhshovono6@gmai.com',
        to: email,
        subject: 'EWU Traders',
        text: otp
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

