import React, { useState, useEffect } from "react";
import Layout from '../site/Layout';
import { API } from "../config";
import '../style.css'
import { Redirect } from "react-router";

const Login = () => {
    const [valeursUsager, setValeursUsager] = useState({
        email: '',
        mdp: '',
        erreur: '',
        chargement: false,
        rediriger: false,
    });
    useEffect(() => { document.body.style.backgroundColor = '#ededed' })

    const submitValeurs = (event) => {
        event.preventDefault(); // Methode qui permets d'interdire le refresh.
        setValeursUsager({ ...valeursUsager, erreur: false, chargement: true});
        valeursForm({ email, mdp }).then(data => {
            if (data.erreur){
                setValeursUsager({...valeursUsager, erreur: data.erreur, chargement: false})
            }else{
                setValeursUsager({
                    ...valeursUsager, rediriger: true
                });
            }
        });
    };
    /**
     * Envoie les valeurs au backend.
     */
    const valeursForm = (usager) => { // Var usager = objet javascript avec les information de l'utilisateur.
        fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-type": "application/json"
            },
            body: JSON.stringify(usager)
        })
            .then(reponse => {
                return reponse.json
            })
            .catch(err => {
                console.log(err)
            })
    };

    const changementValeurs = contenu => event => {
        setValeursUsager({ ...valeursUsager, erreur: false, [contenu]: event.target.value });
    }

    const { email, mdp, erreur, chargement, rediriger } = valeursUsager;
    const form = () => (
        <div className="section-inscription">
            <p className="header-inscription">Créer un compte x</p>
            <p className="paragraph-inscription">Créer un seul compte pour tous vos achats!</p>
            <form action="POST" className="flex-inscription">
                <div className="form-group form-inscription">
                    <label className="text-muted">Email</label>
                    <input onChange={changementValeurs('email')} type="email" className="form-control" value={email}/>
                </div>
                <div className="form-group form-inscription">
                    <label className="text-muted">Mot de passe</label>
                    <input onChange={changementValeurs('mdp')} type="password" className="form-control" value={mdp}/>
                </div>
                <button className="btn btn-inscription" onClick={submitValeurs}>S'inscrire</button>
            </form>
        </div>
    )

    const afficheErreur = () => (
        <div className="alerte alerte-danger" style= {{display: erreur ? "" : "none"}}>{erreur}</div>
    );

    const afficheChargement = () => (
        chargement && (<div className="alerte alerte-info"> 
            <h2>Chargement...</h2>
        </div>
        )
    );

    const redirigerUtilisateur = () => {
        if(rediriger){
            return <Redirect to="/" />;
        }
    }
    return (
        <Layout title="Login page" description="Ecommerce app" className="">
            {afficheChargement()}
            {afficheErreur()}
            {form()}
            {redirigerUtilisateur()}
        </Layout>
    )
}
export default Login;