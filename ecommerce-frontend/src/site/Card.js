import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from './ShowImage';
import { ajoutItem,MisAjourItem , supprimerProduit} from "./panierHelper";
import moment from "moment";
import "../CSS/Card.css";

const Card = ({
            product, 
            montrerBoutonAjouterPanier = true,
            showViewProductButton = true,
            PanierUpdate = false, 
            MontrerSupprimerProduitBouton=false,
            setRun = f => f,
            run = undefined 
          }) => {


  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const AjouterAuPanierBoutton = (montrerBoutonAjouterPanier) =>{
    return (
      montrerBoutonAjouterPanier && (
        <button onClick={AjouterAuPanier} type="button" className="btn bg-cart"><i className="fa fa-cart-plus mr-2"></i> Ajouter au Panier</button>
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
  setRun(!run); // run le useEffect dans Cart
  // valeur par default 1 (on peux pas avoir 0 ou -1)
  setCount(event.target.value < 1 ? 1 : event.target.value)
 // Ne laisse pas rajouter plus que la quantité disponible
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
                <span className="input-group-text me-2 mt-2 bg-light"> Quantité </span>
            </div><input type="number" className="form-control" 
            value={count} onChange={handleChange(product._id)}></input>
       </div>

    </div>
}
const supprimerProduitBoutton = (MontrerSupprimerProduitBouton) =>{
  return (MontrerSupprimerProduitBouton && (
      <button onClick={() => supprimerProduit(product._id,setRun(!run))} 
          className = "btn btn-outline-danger mt-2 mb-2">
          Supprimer
      </button>
  )
  );
};
  
  
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill" style={{backgroundColor: "#ed6436"}}> En Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill" style={{backgroundColor: "#ed6436"}}> En Rupture de Stock</span>
    );
  }

  return (

    <div className="col-md-4 mb-3 d-flex align-items-stretch row ">
    <div className="card bg-light ">
       {DoitRediriger(redirect)}
    <ShowImage className="card-img mb-auto" item={product} url="product" />
      <div className="card-body d-flex flex-column ">
      <div className="mt-auto ">
                    <h6 className="font-weight-semibold"> 
                    <a href={`/productdetails/${product._id}`} className="text-center" data-abc="true">{product.name}</a> </h6> 
                    <a href="#" class="text-muted" data-abc="true">{product.category.name}</a>
      <h3 className="font-weight-semibold">${product.price}</h3>
                <div className="">{showStock(product.quantity)} </div>
                
                {AjouterAuPanierBoutton(montrerBoutonAjouterPanier)}
                {supprimerProduitBoutton(MontrerSupprimerProduitBouton)}
                {AffichageUpdatesOptionsPanier(PanierUpdate)}
                </div>
      </div>
    </div>
  </div>
      /* VERSION REDA =>
    <div className="col-md-4 mt-2 ">
            <div className="card">
                {DoitRediriger(redirect)}
                <div className="card-body">
                <div className="card-img-actions"> 
                  <ShowImage className="card-img" item={product} url="product" />
                  </div>
                </div>
                <div className="card-body bg-light text-center">
                    <div className="mb-2">
                        <h6 className="font-weight-semibold mb-2"> <a href={`/productdetails/${product._id}`} className="text-default mb-2" data-abc="true">{product.name}</a> </h6> <a href="#" class="text-muted" data-abc="true">{product.category.name}</a>
                    </div>
                    <h3 className="mb-0 font-weight-semibold">${product.price}</h3>
                    <div className="mb-2">{showStock(product.quantity)} </div>
                    <button onClick={AjouterAuPanier} type="button" className="btn bg-cart"><i className="fa fa-cart-plus mr-2"></i> Ajouter au Panier</button>
                    {supprimerProduitBoutton(MontrerSupprimerProduitBouton)}
                    {AffichageUpdatesOptionsPanier(PanierUpdate)}
                </div>
            </div>
        </div> */

  );

};

export default Card;

