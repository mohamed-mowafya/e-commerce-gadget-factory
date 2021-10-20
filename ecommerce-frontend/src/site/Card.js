import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import MontrerImage from './MontrerImage';


const Card = ({produit}) => {

return(

   
 
    <div className="col-md-4 mx-auto mt-4">
      <div className="card card1" >
  {/* <img src="https://i.ytimg.com/vi/lK9r-7eSTLs/maxresdefault.jpg" class="card-img-top" alt="..."/> */}
  
  <div className="card-body">
      <MontrerImage item ={produit} url="product"/>
    <h5 className="card-title">{produit.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{produit.price}</h6>
    <p className="card-text">{produit.description}</p>
    <Link to="/">
             <button class=" btn1 mt-2 mb-2" ><i className="fas fa-link"></i> Voir produit</button>
            </Link>
             <Link to="/">
              <button className="btn1 mt-2 mb-2" ><i className="fab fa-github"></i> + Panier</button>
          </Link>
  </div>
  </div>
    </div>   

 /*  <div className="col-4 mb-3">
            <div className="card">
            <div className="card-header">{produit.name}</div>
            <div className="car-body">
                <p>{produit.description}</p>
                <p>{produit.price}</p>
                <Link to="/">
                    <button className="btn btn-outline-dark  mt-2 mb-2">Voir produit</button>
                </Link>
                <Link to="/">
                    <button className="btn btn-outline-dark mt-2 mb-2">+ panier</button>
                </Link>

            </div>
            </div>
        </div>
 */


  
      

);

};

export default Card;

