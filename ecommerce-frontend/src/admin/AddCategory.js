import React, { useState } from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import { createCategory } from "./AdminApi";
const AddCategory = () => {
    const [name,setName] = useState('');
    const [error,setError] = useState(false);
    const [success,setSuccess] = useState(false);
    const {user,token} = estAuthentifier()
    const changerValeurs = (event) =>{
        setError('')
        setName(event.target.value);
    }
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
    const newCategoryForm = () =>(
        <form onSubmit={submitCategory}>
            <div className="form-group">
                <label className="text-muted">Nom</label>
                <input type="text" className="form-control" onChange={changerValeurs} value={name} required autoFocus></input>
            </div>
            <button className="btn btn-outline-primary">
                    Créer catégorie
                </button>
        </form>
    )
    const affichageSucces = () =>{
        if(success){
            return <h3 className="text-success">{name} a été crée avec succès</h3>
        }
    }
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