
// Aide : https://express-validator.github.io/docs/

exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Le nom est requis').notEmpty();
    req.check('email', 'Email doit comporter entre 3 et 32 ​​caractères')
        .matches(/.+\@.+\..+/)
        .withMessage('Email doit comporter  @')
        .isLength({
            min: 4,
            max: 32
        });
    req.check('password', 'Mot de passe requis').notEmpty();
    req.check('password')
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