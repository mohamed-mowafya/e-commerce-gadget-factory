import React, {useState, useEffect} from "react";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";



const Paiement = ({product}) => {
   
   // calcule du prix avant taxes
   //Affichage du prix avant taxes
   const getTotal= () =>{
    return product.reduce((valeurActuelle, prochaineValeur)=>{
        return valeurActuelle + prochaineValeur.count * prochaineValeur.price; 
    },0);
   }
   
   
   const AfficherPaiement = ()=>{
       
     return estAuthentifier() ? (
         <button className="btn btn-success">PAiement</button>
     ) : (
         <Link to= "/login">
             <button className= "btn btn-primary">Connectez vous pour passer au paiement</button>
         </Link>
     );
     };


   return <div>
        <h2>Total: {getTotal()} $CAD</h2>
        {AfficherPaiement()}
    </div>
}

export default Paiement;