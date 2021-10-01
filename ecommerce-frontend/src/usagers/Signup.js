import React, {useState,useEffect} from "react";
import Layout from '../site/Layout';
import {API} from "../config";
import '../CSS/login_signup.css'
const Signup = () =>{
    const [valeursUsager,setValeursUsager] = useState({
        nom: '',
        email: '',
        mdp : '',
        erreur : '',
        succes: false
    }); 
useEffect(() => { document.body.style.backgroundColor = '#ededed' })
const submitValeurs = (event) =>{
    event.preventDefault(); // Methode qui permets d'interdire le refresh.
    valeursForm({nom,email,mdp})
}
/**
 * Envoie les valeurs au backend.
 */
const valeursForm = (usager) =>{ // Var usager = objet javascript avec les information de l'utilisateur.
    fetch(`${API}/signup`,{
        method: "POST",
        headers: {
            Accept:'application/json',
            "Content-type": "application/json"
        },
        body: JSON.stringify(usager)
    })
    .then(reponse => {
        return reponse.json
    })
    .catch(err =>{
        console.log(err)
    })
};
    const changementValeurs = contenu => event =>{
        setValeursUsager({...valeursUsager,erreur:false, [contenu]: event.target.value});
    }
    const {nom,email,mdp} = valeursUsager;
    const form = () =>(
        <div className="section-inscription">
            <p className="header-inscription">Créer un compte x</p>
            <p className="paragraph-inscription">Créer un seul compte pour tous vos achats!</p>
        <form action="POST" className="flex-inscription">
            <div className="form-group form-inscription">
            <label className="text-muted">Nom</label>
            <input onChange={changementValeurs('nom')} type="text" className="form-control"/>
            </div>
            <div className="form-group form-inscription">
            <label className="text-muted">Prénom</label>
            <input onChange={changementValeurs('nom')} type="text" className="form-control"/>
            </div>
            <div className="form-group form-inscription">
            <label className="text-muted">Email</label>
            <input onChange={changementValeurs('email')} type="email" className="form-control"/>
            </div>
            <div className="form-group form-inscription">
            <label className="text-muted">Mot de passe</label>
            <input onChange={changementValeurs('mdp')} type="password" className="form-control"/>
            </div>
            <button type="button" class="btn btn-dark btn-inscription" onClick={submitValeurs}>S'inscrire</button>
        </form>
        </div>
        )
    return (
    <Layout title="Signup page" description="Ecommerce app" className="">
        {form()}
    </Layout>
    )
}
export default Signup;