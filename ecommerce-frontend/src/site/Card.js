import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import ShowImage from './ShowImage';
import { ajoutItem,MisAjourItem } from "./panierHelper";

const Card = ({product, montrerBoutonAjouterPanier = true, PanierUpdate = false}) => {


  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

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

const handleChange = IDproduit => event =>{
  // valeur par default 1 (on peux pas avoir 0 ou -1)
  setCount(event.target.value < 1 ? 1 : event.target.value)
 // Ne laisse pas rajouter pluque la quantité disponible
  if(event.target.value > product.quantity){
  setCount(product.quantity) 
 }
  
  
  

  if(event.target.value >= 1){
    MisAjourItem(IDproduit, event.target.value)
  }
}

const AffichageUpdatesOptionsPanier = PanierUpdate =>{
  
  return  PanierUpdate &&
     <div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text"> Quantité </span>
            </div><input type="number" className="form-control" 
            value={count} onChange={handleChange(product._id)}></input>
       </div>

    </div>
}

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

            {AffichageUpdatesOptionsPanier(PanierUpdate)}
  </div>
  </div>
    </div>   
);

};

export default Card;

