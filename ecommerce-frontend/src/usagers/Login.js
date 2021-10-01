import React, { useState, useEffect } from "react";
import Layout from '../site/Layout';
import { API } from "../config";
import '../CSS/login_signup.css'
import { Redirect } from "react-router";
import { estAuthentifier } from "../Authentification";
import {loginAPI,authentifier} from "../Authentification";
const Login = () => {
    const [valeursUsager, setValeursUsager] = useState({
        email: '',
        mdp: '',
        erreur: '',
        chargement: false,
        rediriger: false,
    });
    useEffect(() => { document.body.style.backgroundColor = '#ededed' })

    const{usager} = estAuthentifier() // Si l'utilisateur est authetifié avec le role de l'admin, il est redirigé vers ( utilisateur/dashboard )

    const submitValeurs = (event) => {
        event.preventDefault(); // Methode qui permets d'interdire le refresh.
        setValeursUsager({ ...valeursUsager, erreur: false, chargement: true});
        loginAPI({email,mdp})
        .then(data => {
            if (data.error){
                setValeursUsager({...valeursUsager, erreur: data.erreur, chargement: false})
            }else{
               authentifier(data,() =>{
                setValeursUsager({
                    ...valeursUsager, rediriger: true
                });
               })
            }
        });
    };

    const changementValeurs = contenu => event => {
        setValeursUsager({ ...valeursUsager, erreur: false, [contenu]: event.target.value });
    }

    const { email, mdp, erreur, chargement, rediriger } = valeursUsager;
    const form = () => (
        <div className="section-inscription-login">
            <p className="header-inscription">Connectez-vous</p>
            <p className="paragraph-inscription">Quel plaisir de vous revoir!</p>
            <form action="POST" className="flex-inscription">
                <div className="form-group form-inscription">
                    <label className="text-muted">Email</label>
                    <input onChange={changementValeurs('email')} type="email" className="form-control" value={email}/>
                </div>
                <div className="form-group form-inscription">
                    <label className="text-muted">Mot de passe</label>
                    <input onChange={changementValeurs('mdp')} type="password" className="form-control" value={mdp}/>
                </div>
                <button type="button" class="btn btn-dark btn-inscription" onClick={submitValeurs}>Se Connecter</button>
            </form>
        </div>
    )

    const affichageErreur =  () =>(
        <div className="alert alert-danger" style={{display: erreur ? '' : 'none'}}>
            {erreur}
        </div>
    )

    const afficheChargement = () => (
        chargement && (<div className="alerte alerte-info"> 
            <h2>Chargement...</h2>
        </div>
        )
    );
       const redirigerUtilisateur = () => {
        if(rediriger){
            if(usager && usager.role === 1 ){
                return <Redirect to="/admin/dashboard" />; // Si admin -> redirigé vers dashboard de l'admin
            }else {
                return <Redirect to="/usager/dashboard" />;  // Si pas admin -> redirigé vers dashboard de l'usager
            }
        }
        if(estAuthentifier()){
            return <Redirect to="/" />; // Si l'usager est connecté -> rediriger vers Home
        }
    }
    return (
        <Layout title="Login page" description="Ecommerce app" className="">
            {afficheChargement()}
            {affichageErreur()}
            {redirigerUtilisateur()}
            {form()}
            
        </Layout>
    )
}
export default Login;