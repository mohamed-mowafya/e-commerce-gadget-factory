import React, { useState, useEffect } from "react";
import Layout from '../site/Layout';
import { API } from "../config";
import '../CSS/login_signup.css'
import { Redirect } from "react-router";
import { estAuthentifier } from "../Authentification";
import { loginAPI, authentifier } from "../Authentification";
import imageConnexion from '../images/image_connexion.png'; 
const Login = () => {
    const [valeursUsager, setValeursUsager] = useState({
        email: '',
        mdp: '',
        erreur: '',
        chargement: false,
        rediriger: false,
    });
    useEffect(() => { document.body.style.backgroundColor = '#ededed' })

    const { usager } = estAuthentifier() // Si l'utilisateur est authetifié avec le role de l'admin, il est redirigé vers ( utilisateur/dashboard )

    const submitValeurs = (event) => {
        event.preventDefault(); // Methode qui permets d'interdire le refresh.
        setValeursUsager({ ...valeursUsager, erreur: false, chargement: true });
        loginAPI({ email, mdp })
            .then(data => {
                if (data.error) {
                    setValeursUsager({ ...valeursUsager, erreur: data.error, chargement: false })
                } else {
                    authentifier(data, () => {
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
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src={imageConnexion} className="img-fluid"
                            alt="Image Connexion"/>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Connexion</p>
                        <form action="POST">                           
                            <div className="form-outline mb-4">
                                <input onChange={changementValeurs('email')} type="email" id="form3Example3" className="form-control form-control-lg"
                                    placeholder="Adresse email" value={email} />
                            </div>

                            
                            <div className="form-outline mb-3">
                                <input onChange={changementValeurs('mdp')} type="password" id="form3Example4" className="form-control form-control-lg"
                                    placeholder="Mot de passe" value={mdp} />
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="button" className="btn btn-primary btn-lg"
                                    style={{paddingLeft: "2.5rem;", paddingRight: "2.5rem;" , backgroundColor: "#ed6436"}} onClick={submitValeurs}>Se Connecter</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Pas de compte? <a href="/signup"
                                    className="link-danger">Inscrivez-vous</a></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </section>
        // <div className="section-inscription-login">
        //     <p className="header-inscription">Connectez-vous</p>
        //     <p className="paragraph-inscription">Quel plaisir de vous revoir!</p>
        //     <form action="POST" className="flex-inscription">
        //         <div className="form-group form-inscription">
        //             <label className="text-muted">Email</label>
        //             <input onChange={changementValeurs('email')} type="email" className="form-control" value={email}/>
        //         </div>
        //         <div className="form-group form-inscription">
        //             <label className="text-muted">Mot de passe</label>
        //             <input onChange={changementValeurs('mdp')} type="password" className="form-control" value={mdp}/>
        //         </div>
        //         <button type="button" class="btn btn-dark btn-inscription" onClick={submitValeurs}>Se Connecter</button>
        //     </form>
        // </div>
    )

    const affichageErreur = () => (
        <div className="alert alert-danger" style={{ display: erreur ? '' : 'none' }}>
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
        if (rediriger) {
            if (usager && usager.role === 1) {
                return <Redirect to="/admin/dashboard" />; // Si admin -> redirigé vers dashboard de l'admin
            } else if (usager) {
                return <Redirect to="/usager/dashboard" />;  // Si pas admin -> redirigé vers dashboard de l'usager
            }
        }
        if (estAuthentifier()) {
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