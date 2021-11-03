import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from './ShowImage';
import moment from "moment";
import "../CSS/Card.css"


const Card = ({ product, showViewProductButton = true }) => {
  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className=" btn btn-primary mt-2 mb-2" >
            <i className="fas fa-link"></i> Voir produit
          </button>
        </Link>
      )
    );
  };
  
  const showAddToCartButton = () => {
    return (
      <Link to={``}>
          <button className="btn btn-dark mt-2 mb-2" ><i className="fab fa-github"></i> + Panier</button>
      </Link>
    );
  };
  
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill"> En Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill"> En Rupture de Stock</span>
    );
  }

  return (


      <div className="card card1" >


        <div className="card-body">
          <ShowImage item={product} url="product" />
          <h5 className="card-title name">{product.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted black-10">{product.price}</h6>
          <p className="card-text lead mt-2">{product.description.substring(0, 110)}.....</p>
          <p className="black-9">Categorie: {product.category && product.category.name}</p>
          <p className="black-8">Ajouter il y a {moment(product.createdAt).fromNow()}</p>
          {showStock(product.quantity)}
          <br />
          
          {showViewButton(showViewProductButton)}
          
          {showAddToCartButton()}
        </div>
      </div>

  );

};

export default Card;

