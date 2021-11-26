const { Commande, ItemChariot } = require('../models/commandes')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');





exports.create = (req, res) => {
    console.log('CREATE ORDER: ', req.body);
    req.body.order.user = req.profile;
    const commande = new Commande(req.body.order)
    commande.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        console.log(req);
        // User.find({ categories: { $in: categories } }).exec((err, users) => {}
        console.log('ORDER IS JUST SAVED >>> ', commande);
        // envoie une laerte de courriel a l'admin
        // order.address
        // order.products.length
        // order.amount
        const emailData = {
            to: 'mkr.viktorya@gmail.com', // admin
            from: 'viktomikto@gmail.com',
            subject: `Une nouvelle commande est reçue`,
            html: `
            <h1>Salut administrateur, quelqu'un vient de faire un achat dans votre boutique en ligne</h1>
            <h2>Nom du client: ${commande.user.nom}</h2>
            <h2>Prénom du client: ${commande.user.prenom}</h2>
            <h2>Adresse du client: ${commande.address}</h2>
            <h2>Historique des achats de l'utilisateur: ${commande.user.history.length} purchase</h2>
            <h2>Email: ${commande.user.email}</h2>
            <h2>Total produits: ${commande.products.length}</h2>
            <h2>Transaction ID: ${commande.transaction_id}</h2>
            <h2>Status de commande: ${commande.statut}</h2>
            <h2>Détails du produit:</h2>
            <hr />
            ${commande.products
                .map(p => {
                    return `<div>
                        <h3>Nom du produit : ${p.name}</h3>
                        <h3>Prix ​​du produit: ${p.price}</h3>
                        <h3>La quantité de produit: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Coût total de la commande: ${commande.montant_total}<h2>
            <p>Connectez-vous à votre tableau de bord</a> pour voir la commande en détail.</p>
        `
        };
        sgMail
            .send(emailData)
            .then(sent => console.log('SENT >>>', sent))
            .catch(err => console.log('ERR >>>', err));

        // courriel envoyé au client ayant acheté un produit
        const emailData2 = {
            to: commande.user.email,
            from: 'viktomikto@gmail.com',
            subject: `Votre commande est en cours`,
            html: `
            <h1>Bonjour ${commande.user.nom}, merci de magasiner avec nous.</h1>
            <h2>Produits au total: ${commande.products.length}</h2>
            <h2> ID de transaction: ${commande.transaction_id}</h2>
            <h2>Status de la commande: ${commande.statut}</h2>
            <h2>Détails de produits:</h2>
            <hr />
            ${commande.products
                .map(p => {
                    return `<div>
                        <h3>Nom du produit: ${p.name}</h3>
                        <h3>Prix: ${p.price}</h3>
                        <h3>Quantité: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Coût total: ${commande.montant_total}<h2>
            <p>Merci :).</p>
        `
        };
        sgMail
            .send(emailData2)
            .then(sent => console.log('Evoyé 2 >>>', sent))
            .catch(err => console.log('Erreur 2 >>>', err));

        res.json(data);
    });
};

exports.afficherCommandes = (req, res) => {
    Commande.find()
        .populate('user', "_id nom prenom address")
        .sort('-created')
        .exec((err, commandes) => {
            if (err) {
                res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(commandes)
        })
}

exports.getValeursEtat = (req, res) => {
    res.json(Commande.schema.path('statut').enumValues);
}

exports.commandeParId = (req, res, next, commandeId) => {
    Commande.findById(commandeId)
        .populate('products.product', 'name price')
        .exec((err, commande) => {
            if (err) {
                res.status(400).json({
                    error: errorHandler(err)
                })
            }
            req.commande = commande
            next()
        })

}

exports.updateValeurEtat = (req, res) => {
    Commande.update({ _id: req.body.commandeId }, { $set: { statut: req.body.statut } }, (err, commande) => {
        if (err) {
            res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(commande)
    })
}

