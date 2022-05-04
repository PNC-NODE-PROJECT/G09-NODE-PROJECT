const routes = require('express').Router();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');


routes.get('/test', (req, res) => {
  res.status(200).json({ message: 'test!' });
});

// send score though email
routes.post('/email', (req, res) =>{

  var smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'hak.kim@student.passerellesnumeriques.org',
          pass: 'zeumskuewdyeztcr'
      },
      rejectUnauthorized: false
  });  

  
  var mailOptions = {
   
    from: "hak.kim@student.passerellesnumeriques.org",
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.content + "%",
   
    
  };

  
  smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error while sending mail: ' + error);
    } else {
        console.log('Message sent: %s', info.messageId);
    }
    smtpTransport.close();
});  

})

module.exports = routes;
