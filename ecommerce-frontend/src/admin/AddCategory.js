import React, { useState } from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import { createCategory } from "./AdminApi";
import '../CSS/categories_products.css';
const AddCategory = () => {
    const [name,setName] = useState('');
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);
    const {user,token} = estAuthentifier()
    const changerValeurs = (event) =>{
        setError('');
        setSuccess('');
        setName(event.target.value);
    }
    /**
     * Méthode qui va appeller l'API du backend
     * afin de créer une catégorie.
     * @param {*} event 
     * Variable event qui sert à empêcher la page de refresh.
     */
    const submitCategory = (event) =>{
        setError('')
        event.preventDefault();
        setSuccess(false)
        // API
        createCategory(user._id,token,{name})
        .then(data => {
            if (data.error){
                setError(true);
            }
            else{
                setError("");
                setSuccess(true);
            }
        })
    }

    /**
     * Méthode qui va contenir le form avec le HTML 
     * afin d'ajouter une catégorie.
     */
    const newCategoryForm = () =>(
        <div className="form-categorie">
        <form onSubmit={submitCategory}>
            
            <div className="form-group">
                <h2 id= "titre-produit"> Ajouter votre catégorie </h2>
                <label className="text-muted">Nom</label>
                <input type="text" className="form-control" onChange={changerValeurs} value={name} required autoFocus></input>
            </div>
            <button className="btn btn-outline-primary btn-categorie">
                    Créer catégorie
                </button>
        </form>
        </div>
    )

    /**
     * Méthode qui permets d'afficher un message du succès
     * lorsqu'une nouvelle catégorie a été ajouté.
     */
    const affichageSucces = () =>{
        if(success){
            return <h3 className="text-success">{name} a été crée avec succès</h3>
        }
    }

    /**
     * Méthode qui permets d'afficher un message d'erreur
     * lorsqu'une nouvelle catégorie ne peut pas être ajouté.
     */
    const affichageErreur = () =>{
        if(error){
            return <h3 className="text-success">{name} existe déjà</h3>
        }
    }
    return(
        <Layout
            title="Ajouter une catégorie">
                <div className="row">
                    {affichageErreur()}
                    {affichageSucces()}
                    <div className="col-md-8 offset-md-2">{newCategoryForm()}</div>
                </div>
        </Layout>
    )
}
export default AddCategory;