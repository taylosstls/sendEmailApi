import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import sendGrid from '@sendgrid/mail';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api', (request, response, next) => {
  response.send('API Status: Running');
});

app.post('/api/email', (request, response, next) => {
  sendGrid.setApiKey(`${process.env.PASSWORD}`);

  const msg = {
    to: 'luisgustavogto@gmail.com',
    from: request.body.email,
    subject: 'Mensagem de contato',
    text: request.body.message,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sendGrid.send(msg)
    .then(result => {
      response.status(200).json({
        success: true
      });
    })
    .catch(err => {
      console.log('error: ', err);
      response.status(401).json({
        success: false
      });
    });
});

app.listen(process.env.PORT || 3000);
