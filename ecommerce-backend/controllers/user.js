const User = require('../Models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');



exports.signup =  (req, res) => {



    const user = new User(req.body);

    user.save((err,user) => {


        if(err) {

            return res.status(400).json({
                err:errorHandler(err)
            });
        }


        user.hashed_password = undefined;
        user.salt = undefined;


        res.json({
            user
        });





    });

};
