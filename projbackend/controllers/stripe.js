const stripe = require('stripe')(
  'sk_test_51INyHZKC5wLr4KhLtXfCgVJhRdtAAEo8LjAmkQdcnKOGVlSsEQtfMStZr0QCtiBOmgnolRe3MAXHellp9JFBIHh300THtt2JJl'
);
const uuid = require('uuid');

exports.makePayment = (req, res) => {
  //
  const { products, token } = req.body;

  let amount = 0;
  products.map((product) => {
    amount += product.price;
  });
  const idempotencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: 'a test account',
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencyKey }
        )
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((error) => console.log(error));
    });
};
