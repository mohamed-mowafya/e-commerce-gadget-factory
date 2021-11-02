import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import ShowImage from './ShowImage';
import { ajoutItem } from "./panierHelper";

const Card = ({product, montrerBoutonAjouterPanier = true}) => {


  const [redirect, setRedirect] = useState(false);

  const AjouterAuPanierBoutton = (montrerBoutonAjouterPanier) =>{
    return (
      montrerBoutonAjouterPanier && (
        <button onClick={AjouterAuPanier} 
            className = "btn btn-dark mt-2 mb-2 mr-2">
            +Panier
        </button>
      )
    );
};

const AjouterAuPanier = () =>{
      ajoutItem(product, ()=> { // prend en params le produit et la fonction callback
      setRedirect(true)
  });
};

const DoitRediriger = redirect =>  {
  if (redirect){
      return <Redirect to = "/cart" />
  };
};

return(

   
 
    <div className="col-md-4 mx-auto mt-4">
      <div className="card card1" >
 
  
  <div className="card-body">
    {DoitRediriger(redirect)}
      <ShowImage item ={product} url="product"/>
    <h5 className="card-title">{product.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{product.price}</h6>
    <p className="card-text">{product.description.substring(0, 110)}.....</p>
    <Link to="/">
             <button className=" btn btn-primary mt-2 mb-2" ><i className="fas fa-link"></i> Voir produit</button>
            </Link>
            {AjouterAuPanierBoutton(montrerBoutonAjouterPanier)}
  </div>
  </div>
    </div>   
);

};

export default Card;

