const request = require('request');
const apiv1Url = process.env.ATYLA_API_V1_LINK;

module.exports = {
  login(req, res) {
    request.post(`${apiv1Url}login`, { form: req.body }, function (err, httpResponse, body) {
      if (httpResponse.statusCode === 200) {
        res.send({ data: JSON.parse(body) });
      } else {
        res.status(401).send({ data: { message: "Something went wrong !" } })
      }
    });
  },
  loginPayment(req, res) {
    request.post(`${apiv1Url}login`, { form: { data: { attributes: req.body } } }, function (err, httpResponse, body) {
      if (httpResponse.statusCode === 200) {
        res.redirect(
          `/atyla-payment/${req.query.ico}?amount=${req.query.amount}&token=${JSON.parse(body).token}&user=${JSON.parse(body).id}&order=${req.query.order}&session=${req.query.session}`);
      } else {
        res.render('login', {
          amount: req.query.amount,
          ico: req.query.ico,
          order: req.query.order,
          session: req.query.session,
          errors: "Wrong password or email !" })
      }
    });
  },
  registerPayment(req, res) {
    request.post(`${apiv1Url}users`, { form: { data: { attributes: req.body } } }, function (err, httpResponse, body) {
      if (httpResponse.statusCode === 200) {
        res.send(body);
      } else {
        res.status(httpResponse.statusCode).send(body)
      }
    });
  }
};
