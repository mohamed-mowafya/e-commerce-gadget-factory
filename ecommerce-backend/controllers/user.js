
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

//Methode pour lire les donnes du user
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

//Methode pour mettre a jour le profile du user 
exports.update = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.profile._id}, 
        {$set: req.body}, 
        {new: true},
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'tu nas pas lautorisation pour cette action'
                });
            }
            user.hashed_password = undefined; 
            user.salt = undefined;
            res.json(user);
        }
        );
}