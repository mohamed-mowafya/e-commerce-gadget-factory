
const User = require('../models/user');
const passHash = new User();
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
    if(req.body.hashed_password!=''){
        req.body.hashed_password = passHash.encrypterLeMotDePasse(req.body.hashed_password);
        req.body.salt = passHash.getSalt();
    }
    User.findOneAndUpdate(
        {_id: req.profile._id}, 
        {$set: req.body}, 
        {new: true},
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'tu n\'as pas lautorisation pour cette action'
                });
            }
            user.hashed_password = undefined; 
            user.salt = undefined;
            res.json(user);
        }
        );
}