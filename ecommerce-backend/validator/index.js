
// Aide : https://express-validator.github.io/docs/
/**
 * user sign up validator
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.userSignupValidator = (req, res, next) => {
    req.check('nom', 'Le nom est requis').notEmpty();
    req.check('prenom','Le prenom est requis').notEmpty();
    req.check('email', 'Email doit comporter entre 3 et 32 ​​caractères')
        .matches(/.+\@.+\..+/)
        .withMessage('Email doit comporter  @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('mdp', 'Mot de passe requis').notEmpty();
    req.check('mdp')
        .isLength({ min: 6 })
        .withMessage('Le mot de passe doit contenir au moins 6 caractères')
        .matches(/\d/)
        .withMessage('Le mot de passe doit contenir un nombre');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};