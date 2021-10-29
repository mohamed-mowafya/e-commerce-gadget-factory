import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import ShowImage from './ShowImage';


const Card = ({product}) => {

return(

   
 
    <div className="col-md-4 mx-auto mt-4">
      <div className="card card1" >
 
  
  <div className="card-body">
      <ShowImage item ={product} url="product"/>
    <h5 className="card-title">{product.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{product.price}</h6>
    <p className="card-text">{product.description.substring(0, 110)}.....</p>
    <Link to="/">
             <button class=" btn btn-primary mt-2 mb-2" ><i className="fas fa-link"></i> Voir produit</button>
            </Link>
             <Link to="/">
              <button className="btn btn-dark mt-2 mb-2" ><i className="fab fa-github"></i> + Panier</button>
          </Link>
  </div>
  </div>
    </div>   
);

};

export default Card;

