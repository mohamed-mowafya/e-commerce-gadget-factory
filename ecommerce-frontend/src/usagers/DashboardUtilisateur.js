import React from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";


const Dashboard = () => {

    //Pour pouvoir update le profile 
    const {usager : _id, nom, email, role} = estAuthentifier()

    // permet de naviguer sur des liens qui appartiennent seulement a l'usager, ex : modifier son profil
    const liensUsagers  = () => {
        return(
            
            <div className="card">
                <h4 className="card-header">Lien de l'usager</h4>
                <ul className = "list-group">

                 <li className = "list-group-item">
                     <Link className="nav-link" to="/panier">Mon panier</Link>
                 </li>
                 <li className = "list-group-item">
                     <Link  className="nav-link" to="/profile/modifier">Modifier mon profile</Link>
                 </li>

                </ul>

            </div>

        )

    }

    // retourne les information de l'usager
    const informationsUsager = () =>{
        return(
            <div className="card mb-5">
       <h3 className="card-header">Informations</h3>
       <ul className = "list-group">

        <li className = "list-group-item">{nom}</li>
        <li className = "list-group-item">{email}</li>
        <li className = "list-group-item">
            {role == 1 ? 'Administrateur' : "Usager Connecté"}</li>

       </ul>
       </div>
        )
    }

    // retourn l'histoque d'achat de l'usager
    const histoqiqueAchat = ()=>{
        return(
            <div className ="card mb-5">
            <h3 className="card-header">Votre historique d'achat</h3>
     
            <ul className = "list-group">
     
             <li className = "list-group-item">historique</li>
         
     
            </ul>
     
     
            </div>
        )
    }


    return (
        <Layout title="Dashboard de l'utilisateur"  description={`Bonjour ${nom}!`} className = "container-fluid"> 
       

           <div className="row">
               <div className="col-3">
                {liensUsagers()}

               </div>
                <div className="col-9">
                {informationsUsager()}
                {histoqiqueAchat()}

               </div>
               </div> 
        </Layout>
    );


};

export default Dashboard ; 