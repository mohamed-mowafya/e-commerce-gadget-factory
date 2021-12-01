const formidable = require('formidable');
const _ = require('loadsh');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
const product = require('../models/product');

/**
 * Methode pour cherhcer un produit 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} id 
 */
exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category')
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: "Produit non trouvé"
                });
            }
            req.product = product;
            next();
        });
};

/**
 * Methode pour trouver un prodit avec son id 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product);
};

/**
 * Methode pour cree un produit
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image non telechargé'
            })
        }
        const { name, description, price, category, quantity, shipping } = fields

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "Touts les fields doivent être remplis"
            });
        }


        let product = new Product(fields)

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image doit être plus petite que 1mb"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        })
    })
};

/**
 * Methode pour supprimer un produit
 * @param {*} req 
 * @param {*} res 
 */
exports.remove = (req, res) => {
    let product = req.product
    product.remove((err) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Produit supprimé avec succès"
        })
    });
};

/**
 * Methode pour mettre a jour les donnees d'un produit
 * @param {*} req 
 * @param {*} res 
 */
exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image non telechargé'
            })
        }
        const { name, description, price, category, quantity, shipping } = fields

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: "Touts les fields doivent être remplis"
            });
        }

        let product = req.product
        product = _.extend(product, fields);

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image doit être plus petite que 1mb"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        })
    })
};

/**
 * Methode pour lister tout les produits disponible
 * @param {*} req 
 * @param {*} res 
 */
exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    product.find()
        .select("-photo")
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Produit non trouve'
                })
            }
            res.json(products);
        });
};

/**
 * Methode pour chercher un produit par id
 * @param {*} req 
 * @param {*} res 
 */
exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Produit non trouvé'
                })
            }
            res.json(products);
        })
}

/**
 * Methode pour afficher un produit en fonction de sa category
 * @param {*} req 
 * @param {*} res 
 */
exports.listCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'catégories non trouvé'
            })
        }
        res.json(categories);
    });
};

/**
 * Methode pour afficher les produits les plus recherches 
 * @param {*} req 
 * @param {*} res 
 */
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Produit non trouvé"
                });
            }
            res.json({
                size: data.length,
                data
            })
        });
};

/**
 * Methode pour afficher la photo d'un produit
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

/**
 * Methode pour afficher les produits en fonction des categories les plus rechercher 
 * @param {*} req 
 * @param {*} res 
 */
exports.listSearch = (req, res) => {
    // creer un query objet qui va contenir les valeurs de la recherche et de la categorie rechercher
    const query = {};
    //assigner la valeur de la recherche au query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' };
        // assigner la categorie rechercher au query.category
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
        //trouver le produit qui a été rechercher 
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);
        }).select('-photo');
    }
}

/**
 * Methode qui va soustraire les produits l'ors de leurs achat 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.soustraireQuantite = (req,res,next) =>{
    let produitsASoustraire = req.body.order.products.map((produit)=>{
        return{
            updateOne:{
                filter:{_id: produit._id},
                update:{$inc: {quantity: -produit.count,sold: +produit.count}}
            }
        }
    })
    Product.bulkWrite(produitsASoustraire,{},(err,produits)=>{
        if(err){
            return res.status(400).json({
                error: 'Erreur de update produit'
            })
        }
        next();
    })
}
