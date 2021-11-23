// Source : https://medium.com/@danmolitor/writing-tests-for-mongo-mongoose-with-mocha-7e98be740074

/***
 * Tests qui vont permettre de tester les models mongoose du site.
 */

const assert = require('assert');
const Usager = require('../models/user');
const UserModel = require('../models/user');
const mongoose = require('mongoose');
const ProductModel = require('../models/product');
const CategorieModel = require('../models/category');
const { Commande, ItemChariot } = require('../models/commandes')
describe('Création dun compte (test du modèle usager)', () => {

    beforeEach(done => {
        mongoose.connection.collections.users.drop(() => {
            done();
        });
    });

    it('Crée un compte usager', (done) => {
        let modelUsager = new UserModel();
        let mdpHashed = modelUsager.encrypterLeMotDePasse("Test1234!");
        const usager = new Usager({ nom: "test", prenom: "test", email: "test@gmail.com", hashed_password: mdpHashed })
        usager.save()
            .then(() => {
                assert(!usager.isNew); // Si l'usager est déjà sauvegardé dans la bd, il est pas new.
                done();
            });
    })
})

describe('Création une catégorie (test du catégorie)', function () {
    beforeEach(done => {
        mongoose.connection.collections.categories.drop(() => {
            done();
        });
    });
    it('Crée une catégorie', (done) => {
        const categorie = new CategorieModel({ name: "Écouteurs" });
        categorie.save()
            .then(() => {
                assert(!categorie.isNew); // Si la catégorie est déjà sauvegardé dans la bd, il est pas new.
                done();
            });
    })
})

describe('Création dun produit (test du modèle produit)', function () {
    beforeEach(done => {
        mongoose.connection.collections.products.drop(() => {
            done();
        });
    });
    it('Crée un produit', (done) => {
        const produit = new ProductModel({
            name: "Produit Test", description: "Produit Test", price: 50,
            quantity: 10, sold: 0, photo: "", shipping: true
        })
        produit.save()
            .then(() => {
                assert(!produit.isNew); // Si le produit est déjà sauvegardé dans la bd, il est pas new.
                done();
            });
    })
})

describe('Création dune commande (test du modèle commande)', function () {
    beforeEach(done => {
        mongoose.connection.collections.commandes.drop(() => {
            done();
        });
    });
    it('Crée une commande', (done) => {
        let modelUsager = new UserModel();
        let mdpHashed = modelUsager.encrypterLeMotDePasse("Test1234!");
        const usager = new Usager({ nom: "test", prenom: "test", email: "test@gmail.com", hashed_password: mdpHashed })
        const itemsChariot = new ItemChariot({ nom: "Playstation 5", prix: 700, quantite: 1 });
        const commande = new Commande({ products: itemsChariot, montant_total: 700, address: "10000 Henri-Bourassa", statut: "En attente", user: usager })
        commande.save()
            .then(() => {
                assert(!commande.isNew); // Si la commande est déjà sauvegardé dans la bd, elle est pas new.
                done();
            });
    })
})