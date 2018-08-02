const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index.handlebars');
});

app.get('/blog', function (req, res) {
  res.render('blog.handlebars')
});
app.get('/contact', function (req, res) {
  res.render('contact.handlebars')
});

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;


  let transporter = nodemailer.createTransport({
  service: 'gmail', 
    auth: {
        user: 'tejasvi02.shinde@gmail.com', // Dummy email tejasvi02.shinde@gmail.com
        pass: '@tej123@'  // Dummy password @tej123@
    }
  });

  
  let mailOptions = {
      from: '"Nodemailer Contact" <tejshinde9876@gmail.com>', 
      to: 'tejshinde9876@gmail.com', 
      subject: 'Email Popup', 
      text: 'Hello', 
      html: output 
  };


  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });

app.listen(8081, () => console.log('Server started...'));