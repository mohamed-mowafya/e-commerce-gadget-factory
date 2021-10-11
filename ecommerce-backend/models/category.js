const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
    },
    { timestamps: true }
);


//CREER UN NOUVEAU MODELE

module.exports = mongoose.model('Category', categorySchema);
