const mongoose = require('mongoose')
const crypto = require('crypto') // POUR HASHER LES PASSWORD
const uuidv1 = require("uuidv1") // pour generer un id unique DOC : https://www.npmjs.com/package/uuidv1


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        hashed_password: {
            type: String,
            required: true
        },
        about: {
            type: String,
            trim: true
        },

        salt: String,

        role: {
            type: Number,
            default: 0
        },
        history: {
            type: Array,
            default: []
        }
    },
    { timestamps: true }
);


// LES FIELDS VIRTUELS
//ON VA UTILISER CES FONCTIONS POUR LOG IN / LOG OUT LES UTILISATEUR


// le field virtuel
userSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encrypterLeMotDePasse(password);
    })
    .get(function() {
        return this._password;
    });





