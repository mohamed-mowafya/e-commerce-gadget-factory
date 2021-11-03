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
   
   
   
   
   
   return <div>
        <h2>Total: {getTotal()} $CAD</h2>
    </div>
}

export default Paiement;