
const User = require('../models/user');

//Chercher un utilisateur par son ID
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Utilisateur introuvable'
            });
        }
        req.profile = user;
        next();
    });
};