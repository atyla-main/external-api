const Ico = require('../../models').Ico;
const Order = require('../../models').Order;
const UserSession = require('../../models').UserSession;
const moment = require('moment');

module.exports = {
  async setup(req, res) {
    let ico = await Ico.findById(req.query.ico);
    let prices = await ico.getPrices();
    let actualPrice = {};
    let value = null;

    prices.forEach(price => {
      if (moment().isBetween(price.startDate, price.endDate)) {
        actualPrice = price.amount
      }
    });

    if (req.body.token) {
      value = req.body.token * actualPrice.value;
    }

    let orderUuid = '';
    let userSessionUuid = '';

    if (!req.query.order) {
      let order = await Order.create({
        status: "creating",
        statusHistory: [{status: "creating", date: moment()}],
        amount: {},
        fees:  0.049,
        source: req.params.merchant
      });
      orderUuid = order.uuid;
      order.setIco(ico.uuid);
      order.setMerchant(req.params.merchant);

      let userSession = await UserSession.create({
        userAgent: req.query.userAgent
      });
      userSessionUuid = userSession.uuid;
    } else {
      orderUuid = req.query.order;
      userSessionUuid = req.query.session;
    }

    let url = `/calculator/${req.params.merchant}?user=${req.query.user}&token=${req.query.token}&ico=${req.query.ico}&order=${orderUuid}&session=${userSessionUuid}`;
    let buyUrl = `/atyla-payment/${ico.uuid}?token=${req.query.token}&amount=${req.body.token}&user=${req.query.user}&order=${orderUuid}&session=${userSessionUuid}`;

    res.render('calculator', {
      ico: ico,
      actualPrice: actualPrice,
      url: url,
      value: value + value * 0.049,
      token: req.body.token,
      buyUrl: buyUrl
    });
  }
};
