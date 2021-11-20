import React, { useEffect, useState } from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import { createCategory, createProduct, getCategories} from "./AdminApi";
import '../CSS/categories_products.css';
import {getCommandes,getValeursEtat,updateEtatCommande} from './AdminApi';
import moment from 'moment' // Module qui permets d'afficher une date lisible.
import localization from 'moment/locale/fr';
const Commandes = () =>{
    const [commandes,setCommandes] = useState([])
    const [valeursEtat,setValeursEtat] = useState([])
    const {user,token} = estAuthentifier()

    /**
     * Méthode qui va charger toutes les commandes du site 
     * à partir de l'api.
     */
    const chargerCommandes = () =>{
        getCommandes(user._id,token).then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setCommandes(data)
            }
            
        })
    }

    /**
     * Méthode qui permets de remplir la variable valeursEtat avec
     * les enums des états de commande qui sont dans le model de la bd
     * commande.
     */
    const chargerValeursEtat = () =>{
        getValeursEtat(user._id,token).then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setValeursEtat(data)
            }
            
        })
    }
    useEffect(()=>{
        chargerCommandes()
        chargerValeursEtat()
        moment.updateLocale('fr',localization) // Permets de changer l'affichage de moment en français.
    },[])

    /**
     * Méthode qui permets d'afficher la quantité de commandes du site.
     */
    const afficherNombreCommandes = () =>{
        if(commandes.length>0){
            return(
                <h1 className="text-danger display-2">Nombre de commandes: {commandes.length}</h1>
            )
        }
        else{
            return(
                <h1 className="text-danger display-2">Aucun commande sur le site.</h1>
            )
        }
    }

    const afficherInformations = (type,information) =>(
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{type}</div>
            </div>
            <input type="text" value={information} className="form-control" readOnly/>
        </div>
    )

    /**
     * Méthode qui permets de changer l'état d'une commande.
     */
    const handleEtat = (event,commandeId) =>{
        updateEtatCommande(user._id,token,commandeId,event.target.value).then(data=>{
            if(data.error){
                console.log("Erreur de changement d'état")
            }
            else{
                chargerCommandes()
            }
        })
    }
    /**
     * Affiche l'état d'une commande à partir de la bd et permets de changer l'état.
     * La méthode affiche la séléction des états à partir des enums de la bd.
     */
    const afficherEtat = (commande) =>(
        <div className="form-group">
            <h3 className="mark mb-4">
                État: {commande.statut}
            </h3>
            <select className="form-control" onChange={(event) => handleEtat(event,commande._id)}>
                <option>Modifier État</option>
                {valeursEtat.map((etat,indexEtat)=>(<option key={indexEtat} value={etat}>{etat}</option>))}
            </select>
        </div>
    )
    return(
        <Layout
            title="Commandes">
                <div className="row">
                    {afficherNombreCommandes()}
                    {commandes.map((commande,indexCommande)=>{
                        return(
                            <div className="mt-5" key={indexCommande} style={{borderBottom:"5px solid indigo"}}>
                                <h2 className="mb-5">
                                    <span className="bg-primary">
                                        ID Commande: {commande._id}
                                    </span>
                                </h2>

                                <ul className="list-group mb-2">
                                <li className="list-group-item">
                                        État: {afficherEtat(commande)}
                                    </li>
                                    <li className="list-group-item">
                                        Transaction: {commande.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Montant: ${commande.montant_total}
                                    </li>
                                    <li className="list-group-item">
                                        Client: {commande.user.nom}, {commande.user.prenom}
                                    </li>
                                    <li className="list-group-item">
                                        Date: {moment(commande.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Adresse: {commande.address}
                                    </li>

                                </ul>
                                {commande.products.map((produit,produitIndex)=>(
                                    <div className="mb-4" key={produitIndex} style={{padding:'20px',border:'1px solid indigo'}}>
                                        {afficherInformations('ID Produit',produit._id)}
                                        {afficherInformations('Nom du produit',produit.name)}
                                        {afficherInformations('Prix',produit.price)}
                                        {afficherInformations('Quantité',produit.count)}
                                    </div>
                                ))}
                            </div>
                            
                        )
                    })}

                </div>
        </Layout>
    )
}

export default Commandes