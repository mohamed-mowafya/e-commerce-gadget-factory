const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
 
const SchemaChariot = new mongoose.Schema(
  {
    produit: { type: ObjectId, ref: "Product" },
    nom: String,
    prix: Number,
    quantite: Number
  },
  { timestamps: true }
);
 
const ItemChariot = mongoose.model("ItemChariot", SchemaChariot);
 
const SchemaCommande = new mongoose.Schema(
  {
    products: [SchemaChariot],
    transaction_id: {},
    montant_total: { type: Number },
    address: String,
    statut: {
      type: String,
      default: "En attente",
      enum: ["En attente", "En traitement", "Envoyé", "Livré", "Annulé"]
    },
    updated: Date,
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);
 
const Commande = mongoose.model("Commande", SchemaCommande);
 
module.exports = {Commande , ItemChariot };