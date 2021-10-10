const formidable = require('formidable');
const _ = require('loadsh');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
const product = require('../models/product');


exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product){
            return res.status(400).json({
                error: "Produit non trouve"
            });
        }
        req.product = product;
        next();
    });
};

exports.read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product);
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=> {
        if(err){
            return res.status(400).json({
                error: 'Image non telecharger'
            })
        }
        const {name, description, price, category, quantity, shipping}= fields

        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: "touts les fields doivent etre remplis"
            });
        }


        let product = new Product(fields)

        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image doit etre plus petite que 1mb"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        })
    })
};

exports.remove = (req, res) => {
    let product = req.product
    product.remove((err) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Produit supprime avec succes"
        })
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files)=> {
        if(err){
            return res.status(400).json({
                error: 'Image non telecharger'
            })
        }
        const {name, description, price, category, quantity, shipping}= fields

        if(!name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: "touts les fields doivent etre remplis"
            });
        }

        let product = req.product
        product = _.extend(product, fields);

        if(files.photo){
            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image doit etre plus petite que 1mb"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }

        product.save((err, result) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }

            res.json(result);
        })
    })
};


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
            if(err){
                return res.status(400).json({
                    error: 'Produit non trouve'
                })
            }
            res.json(products);
        });
};

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find({_id: {$ne: req.product}, category: req.product.category})
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products) => {
        if(err){
            return res.status(400).json({
                error: 'Produit non trouve'
            })
        }
        res.json(products);
    })
}

exports.listCategories = (req, res) => {
    Product.distinct("category", {}, (err, categories) => {
        if(err){
            return res.status(400).json({
                error: 'categories non trouve'
            })
        }
        res.json(categories);
    });
};

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

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
                    error: "Produit non trouve"
                });
            }
            res.json({
                size: data.length,
                data
            })
        });
};

exports.photo = (req, res) =>{
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType)
        return  res.send(Req.product.photo.data)
    }
    next();
}