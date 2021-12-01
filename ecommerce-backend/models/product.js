const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

/**
 * Model pour produit
 */
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 150
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000
        },
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },
        category: {
            type: ObjectId,
            ref: 'Category',
            required: false // required est mis à false afin de pouvoir faciliter les tests unitaires.
        },
        quantity: {
            type: Number
        },
        sold: {
            type: Number,
            default: 0
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        shipping: {
           required: false,
           type: Boolean
        },



        
    },    
    { timestamps: true }
);

//CREER UN NOUVEAU MODELE

module.exports = mongoose.model('Product', productSchema);
