import React from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
const Dashboard = () => {

    const {usager : _id, nom, email, role} = estAuthentifier()


    return (
        <Layout title="Dashboard de l'utilisateur" description = "Voici vos donee" className = "container"> 
       <div className="card mb-5">
       <h3 className="card-header">Informations</h3>
       <ul className = "list-group">

        <li className = "list-group-item">{nom}</li>
        <li className = "list-group-item">{email}</li>
        <li className = "list-group-item">
            {role == 1 ? 'Administrateur' : "Usager Connecté"}</li>

       </ul>
       </div>

       <div className ="card mb-5">
       <h3 className="card-header">Votre historique d'achat</h3>

       <ul className = "list-group">

        <li className = "list-group-item">historique</li>
    

       </ul>


       </div>
        </Layout>
    );


};

export default Dashboard ; 