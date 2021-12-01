const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");


/**
 * chercher category 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @param {*} id 
 */
exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category introuvable",
      });
    }
    req.category = category;
    next();
  });
};

/**
 * Cree une nouvelle categorie
 * @param {*} req 
 * @param {*} res 
 */
exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

/**
 * chercher une category by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.read = (req, res) => {
  return res.json(req.category);
};

/**
 * changer le nom de la category
 * @param {*} req 
 * @param {*} res 
 */
exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

/**
 * supprimer une category
 * @param {*} req 
 * @param {*} res 
 */
exports.remove = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Category supprimer",
    });
  });
};

/**
 * lister toutes les categories 
 * @param {*} req 
 * @param {*} res 
 */
exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
