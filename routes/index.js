var express = require('express');
var router = express.Router();
var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY);
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

router.post('/contact', function(req, res) {
    // var mailOpts, smtpConfig;
    // //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
    // // smtpTrans = nodemailer.createTransport('SMTP', {
    // //     service: 'Gmail',
    // //     auth: {
    // //         user: "darinlevesque@gmail.com",
    // //         pass: "lnvcyvbawwtmnlds"
    // //     }
    // // });
    // var smtpConfig = nodemailer.createTransport('smtps://darinlevesque%40gmail.com:lnvcyvbawwtmnlds@smtp.gmail.com');
    // //Mail options
    // mailOpts = {
    //     from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
    //     to: 'info@pkcphotography.com',
    //     subject: 'Website contact form',
    //     text: req.body.message
    // };
    // smtpConfig.sendMail(mailOpts, function(error, info) {
    //     //Email not sent
    //     if (error) {
    //         res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
    //         return console.log(error);
    //     }
    //     //Yay!! Email sent
    //     else {
    //         res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
    //         console.log('Message sent: ' + info.response);
    //     }
    // });
    var request = sg.emptyRequest()
    request.body = {
        "personalizations": [{
            "to": [{
                "email": "info@pkcphotography.com"
            }],
            "subject": "PKC Photography Contact Form"
        }],
        "from": {
            "email": req.body.email,
        },
        "content": [{
            "type": "text/plain",
            "value": req.body.name + " " + req.body.phone + " " + req.body.comments
        }]
    };
    request.method = 'POST'
    request.path = '/v3/mail/send'
    sg.API(request, function(response) {
        console.log(response.statusCode)
        console.log(response.body)
        console.log(response.headers)
        res.end("Email Sent Successfully");
    })
});

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
