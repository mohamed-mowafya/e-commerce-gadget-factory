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

exports.afficherCommandes = (req,res)=>{
    Commande.find()
    .populate('user',"_id nom prenom address")
    .sort('-created')
    .exec((err,commandes)=>{
        if(err){
            res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(commandes)
    })
}

exports.getValeursEtat = (req,res) =>{
    res.json(Commande.schema.path('statut').enumValues);
}

exports.commandeParId = (req,res,next,commandeId) =>{
    Commande.findById(commandeId)
    .populate('products.product','name price')
    .exec((err,commande)=>{
        if(err){
            res.status(400).json({
                error: errorHandler(err)
            })
        }
        req.commande = commande
        next()
    })

}

exports.updateValeurEtat = (req,res) =>{
    Commande.update({_id:req.body.commandeId},{$set: {statut: req.body.statut}},(err,commande)=>{
        if(err){
            res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(commande)
    })
}