const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
    },
    { timestamps: true }
);


//CREER UN NOUVEAU MODELE

module.exports = mongoose.model('Category', categorySchema);
