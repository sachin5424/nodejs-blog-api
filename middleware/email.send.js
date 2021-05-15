

const { Promise } = require('mongoose');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'easyeasytolearn70@gmail.com',
    pass: 'Viraj@5424'
  }
});

module.exports = {
    email_send:(data,otp)=>{
        var mailOptions = {
            from: 'easyeasytolearn70@gmail.com',
            to:`${data}`,
            subject: 'Sending Email using Node.js',
            text: 'Your Otp :'+otp
        };
        return new Promise((resolve,reject)=>{
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  reject(error)
                } else {
                  resolve('Email sent: ' + info.response);
                }
              });
        })
    }
}



