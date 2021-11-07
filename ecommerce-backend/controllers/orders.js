const {Commande,ItemChariot} = require('../models/commandes')

exports.create = (req, res) =>{
    req.body.order.user = req.profile
    const commande = new Commande(req.body.order)
    commande.save((error,data)=>{
        if(error){
            return res.status(400).json({
            })
        }
        res.json(data)
    })
};