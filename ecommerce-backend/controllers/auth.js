const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const jwt = require("jsonwebtoken"); // generer un token 
const expressJwt = require('express-jwt'); // valider l'autorisation du signin

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const dotenv = require('dotenv');
dotenv.config()


exports.signup = (req, res) => {



    const user = new User(req.body);

    user.save((err, user) => {


        if (err) {

            return res.status(400).json({
                err: errorHandler(err)
            });
        }


        user.hashed_password = undefined;
        user.salt = undefined;


        res.json({user});

            // Envoyer un email de confirmation
           
            const emailData2 = {
                to: user.email,
                from: 'viktomikto@gmail.com',
                subject: `Inscription sur Le Gadget's Factorie`,
                html: `
                <h1>Salut,  ${user.nom},  merci de votre insciption!!! .</h1>
                <hr />
                <hr />
                <hr />
                <h3> Bon magasinage !</h3>
                
            `
            };
            sgMail
                .send(emailData2)
                .then(() => {}, error => {
                    console.error(error);
                
                    if (error.response) {
                      console.error(error.response.body)
                    }
                  });
                //ES8
                (async () => {
                  try {
                    await sgMail.send(emailData2);
                  } catch (error) {
                    console.error(error);
                
                    if (error.response) {
                      console.error(error.response.body)
                    }
                  }
                })();
                
    
           
                
    
    
        })
    
    
       
    
    };
    




exports.signin = (req, res) => {


    // chercher l.utilisateur avec email:
    const { email, mdp } = req.body
    User.findOne({ email }, (error, user) => {


        if (error || !user) {


            return res.status(400).json({

                error: "Mauvais utilisateur ."
            });
        }

        // si utilisateur existe :


        if (!user.authenticate(mdp)) {
            return res.status(401).json(
                {
                    error: "Email ou le mot de passe sont incorrectes !"
                }
            );
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
        res.cookie('t', token, { expire: new Date() + 9999 })
        const { _id, nom, prenom, email, role } = user
        return res.json({ token, user: { _id, email, nom, prenom, role } })

    });





};




exports.signout = (req, res) => {


    res.clearCookie("t");
    res.json({ message: "Déconnexion réussie" });

};


// proteger les routes , juste les utilsiateur login vont avoir acces

exports.requireSignin = expressJwt({

    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth"

})



// middleware pour authentification d'un user Normal

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Accès refusé'
        });
    }
    next();
};


// middleware authentification pour un administrateur


exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Accès refusé! Vous devriez être administrateur'
        });
    }
    next();
};
