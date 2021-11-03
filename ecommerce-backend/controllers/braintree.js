const User = require("../models/user");
const braintree = require('braintree');
require('dotenv').config();


//Connexion à braintree
const gateway = new braintree.BraintreeGateway({
    environment : braintree.Environment.Sandbox,
    merchantId : process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey : process.env.BRAINTREE_PRIVATE_KEY
});

// génère un token
exports.generateToken = (req, res) => {
    gateway.clientToken.generate({}, function(err, reponse){
        if(err){
            res.status(500).send(err);
        } else {
            res.send(reponse);
        }
    });
};

