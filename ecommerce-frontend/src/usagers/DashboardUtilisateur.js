import React, {useState,useEffect} from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import {getHistoriqueAchat} from './apiUsager'
import moment from 'moment' // Module qui va faire en sorte que la date d'achat est plus lisible.

const Dashboard = () => {
    const [historique,setHistorique] = useState([])

    //Pour pouvoir update le profile 
    const {user: {_id,nom,prenom,email,role}} = estAuthentifier();
    
    const token = estAuthentifier().token
    const init = (userId,token) =>{
        getHistoriqueAchat(userId,token).then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setHistorique(data)
            }
        })
    }

    useEffect(()=>{
        init(_id,token)
    },[])

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
                     <Link  className="nav-link" to={`/profile/${_id}`}>Modifier mon profile</Link>
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
        <li className = "list-group-item">Nom: {nom}, {prenom}</li>
        <li className = "list-group-item">Courriel: {email}</li>
        <li className = "list-group-item">
            {role === 1 ? 'Role: Administrateur' : "Role: Usager"}</li>

       </ul>
       </div>
        )
    }

    // retourn l'histoque d'achat de l'usager
    const historiqueAchat = (historique)=>{
        return(
            <div className ="card mb-5">
            <h3 className="card-header">Votre historique d'achat</h3>
     
            <ul className = "list-group"> 
     
             <li className = "list-group-item">
                 {historique.map((historiqueItem,index)=>{
                     return(
                         <div>
                             {historiqueItem.products.map((produit,index)=>{
                                 return(
                                     <div key={index}>
                                         <h6>Produit: {produit.name}</h6>
                                         <h6>Prix: {produit.price}</h6>
                                         <h6>Acheté: {moment(produit.createdAt).fromNow()}</h6>
                                        </div>
                                 )
                             })}
                         </div>
                     )
                 })}
             </li>
         
     
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
                {historiqueAchat(historique)}

               </div>
               </div> 
        </Layout>
    );


};

export default Dashboard ; 