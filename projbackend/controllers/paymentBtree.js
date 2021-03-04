const braintree = require('braintree');

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: '5c3rdhdvbw4wvwdf',
  publicKey: '8fjfyj8s99kqkzwm',
  privateKey: '3201fb73ad8661290e34b682994de729',
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      res.status(500).json(err);
    } else {
      // res.send(response.clientToken);
      res.send(response);
    }
  });
};
exports.processPayment = (req, res) => {
  console.log('PROCESS PAYMENT');
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,
      //   deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        console.log(result);
        res.json(result);
      }
    }
  );
};
