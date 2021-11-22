import React from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";


const DashboardAdministarteur = () => {

    
    const {user : {_id, nom, prenom, email, role}} = estAuthentifier()
    /**
     * Méthode qui affiche les liens (html) que l'administrateur peut accèder dans son dashboard.
     */
    const liensAdmin  = () => {
        return(
            
            <div className="card mt-2">
                <h4 className="card-header">Administration</h4>
                <ul className = "list-group">

                 <li className = "list-group-item">
                     <Link className="nav-link" to="/creer/categorie">Créer une catégorie</Link>
                 </li>
                 <li className = "list-group-item">
                     <Link  className="nav-link" to="/creer/produit">Créer un produit</Link>
                 </li>

                 <li className = "list-group-item">
                     <Link  className="nav-link" to="/admin/orders">Voir les commandes</Link>
                 </li>
                 <li className = "list-group-item">
                     <Link  className="nav-link" to="/admin/products">Gérer les produits</Link>
                 </li>

                </ul>

            </div>

        )

    }

    /**
     * Méthode qui permets de retourner les information de l'Administrateur.
     */
    const informationsAdmin = () =>{
        return(
            <div className="mt-2">
       <h3 className="card-header">Informations</h3>
       <ul className = "list-group">
        <li className = "list-group-item">{nom}, {prenom}</li>
        <li className = "list-group-item">{email}</li>
        <li className = "list-group-item">
            {role == 1 ? 'Administrateur' : "Usager Connecté"}</li>
       </ul>
       </div>
        )
    }



    return (
        <Layout title="Dashboard de l'utilisateur" className = "container-fluid"> 
       

           <div className="row">
               <div className="col-3">
                {liensAdmin()}

               </div>
                <div className="col-9">
                {informationsAdmin()}
                

               </div>
               </div> 
        </Layout>
    );


};

export default DashboardAdministarteur ; 