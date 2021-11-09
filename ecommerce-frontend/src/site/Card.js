import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from './ShowImage';
import { ajoutItem,MisAjourItem , supprimerProduit} from "./panierHelper";
import moment from "moment";
import "../CSS/Card.css"

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
  setRun(!run); // run le useEffect dans Cart
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
const supprimerProduitBoutton = (MontrerSupprimerProduitBouton) =>{
  return (MontrerSupprimerProduitBouton && (
      <button onClick={() => supprimerProduit(product._id,setRun(!run))} 
          className = "btn btn-outline-danger mt-2 mb-2">
          supprimer
      </button>
  )
  );
};
  
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

      <div className="card card1 h-100" >
        <div className="card-body">
          {DoitRediriger(redirect)}
          <div class="ratio ratio-4x3">
          <ShowImage className="card-img" item={product} url="product" />
          </div>
          <h5 className="card-title name">{product.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted black-10">{product.price}</h6>
          <p className="card-text lead mt-2">{product.description.substring(0, 110)}.....</p>
          <p className="black-9">Categorie: {product.category && product.category.name}</p>
          <p className="black-8">Ajouter il y a {moment(product.createdAt).fromNow()}</p>
          {showStock(product.quantity)}
          <br />
          
          {showViewButton(showViewProductButton)}
          
          {AjouterAuPanierBoutton(montrerBoutonAjouterPanier)}
          {supprimerProduitBoutton(MontrerSupprimerProduitBouton)}
          {AffichageUpdatesOptionsPanier(PanierUpdate)}
        </div>
      </div>

  );

};

export default Card;

