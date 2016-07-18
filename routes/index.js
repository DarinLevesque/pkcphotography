var express = require('express');
var router = express.Router();
var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)
// var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// uncomment for coming soon page to be present
// app.get('/', function(req, res) {
//     res.render('comingsoon', { layout: null });
// });

router.get('/', function(req, res) {
    res.render('home');
});

router.get('/about', function(req, res) {
    res.render('about');
});

router.get('/services', function(req, res) {
    res.render('services');
});

router.get('/pricing', function(req, res) {
    res.render('pricing');
});

router.get('/contact', function(req, res) {
    res.render('contact');
});

router.post('/contact', function(req, res, next) {
var name = req.body.name;
var email = req.body.email;
var phone = req.body.phone;
var comments = req.body.comments;

res.send(user_id + ' ' + token + ' ' + geo);

sendgrid.send({
    to: 'info@pkcphotography.com',
    from: email,
    subject: 'Message from PKC contact form',
    text: 'My first email through SendGrid.' + name + comments
}, function(err, json) {
    if (err) {
        return console.error(err); }
    console.log(json);
});

});
}

router.get('/feature-one', function(req, res) {
    res.render('feature-one');
});

router.get('/payment', function(req, res) {
    res.render('payment');
});

router.post('/charge', function(req, res, next) {
    var stripeToken = req.body.stripeToken;
    var amount = req.body.price * 100;

    // ensure amount === actual product amount to avoid fraud

    stripe.charges.create({
            card: stripeToken,
            currency: 'usd',
            amount: amount
        },
        function(err, charge) {
            if (err) {
                console.log(err);
                res.send('error');
            } else {
                res.send('success');
            }
        });
});

// router.post('/payment', function(req, res) {
//     var stripeToken = request.body.stripeToken;

//     var charge = stripe.charges.create({
//         amount: 1000, // amount in cents, again
//         currency: "usd",
//         source: stripeToken,
//         description: "Example charge"
//     }, function(err, charge) {
//         if (err && err.type === 'StripeCardError') {
//             // The card has been declined
//         }
//     });
//     res.render('success');

// });

module.exports = router;
