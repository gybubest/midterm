const md5 = require('md5')
const nodemailer = require('nodemailer');
//Create random url
const urlCreator = () => {
  const string = 'where should we go for lunch?'
  const starter = Math.random().toString(36).substring(7);
  return md5(starter+string)
}
//Send email to creator
const sendlinks = function(senderEmail, password, recipient, pollQuestion, adminLink, userLink) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: password
    }
  });

  const mail = {
    from: 'superfunpolls@gmail.com',
    to: recipient,
    subject: 'Hey, manage your poll here',
    text: `Poll question: ${pollQuestion}\nAsk your friends to vote: http://localhost:8080/${userLink}\nCheck the poll result: http://localhost:8080/${adminLink}`
  };

  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info)
    }
  });

}

module.exports = { urlCreator, sendlinks };
