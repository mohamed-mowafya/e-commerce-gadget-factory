import React, { useState, useEffect } from "react";
import Layout from '../site/Layout';
import { Link } from 'react-router-dom';
import '../CSS/login_signup.css';
import { signupAPI } from '../Authentification';
import imageInscription from '../images/image_inscription.png'
/**
 * Cette classe permet d'afficher la page signup et permettre à l'utilisateur de s'inscire.
 * @returns Retourne l'aspect de la page signup.
 */
const Signup = () => {
    const [valeursUsager, setValeursUsager] = useState({
        nom: '',
        prenom: '',
        email: '',
        mdp: '',
        erreur: '',
        succes: false
    });
    useEffect(() => { document.body.style.backgroundColor = '#ededed' })

    /**
     * Permettre d'envoyer la requete à l'API.
     */
    const submitValeurs = (event) => {
        event.preventDefault(); // Methode qui permets d'interdire le refresh.
        signupAPI({ nom, prenom, email, mdp })
            .then(data => {
                if (data.error) {
                    setValeursUsager(({ ...valeursUsager, erreur: data.error, succes: false }))

                }
                else {
                    setValeursUsager({ ...valeursUsager, nom: '', prenom: '', mdp: '', email: '', erreur: '', succes: true })
                }

            })
    };
    const changementValeurs = contenu => event => {
        setValeursUsager({ ...valeursUsager, erreur: false, [contenu]: event.target.value });
    }
    const { nom, email, prenom, mdp, succes, erreur } = valeursUsager;
    const form = () => (

        <section className="vh-100" >
            <div className="container h-100" >
                <div className="row d-flex justify-content-center align-items-center h-100" >
                    <div className="col-lg-12 col-xl-11" >
                        <div className="card text-black" style={{ border: "none" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Inscription</p>

                                        <form action="POST" className="mx-1 mx-md-4">

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-signature fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onChange={changementValeurs('nom')} value={nom} type="text" id="form3Example1c" className="form-control" placeholder="Nom" />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onChange={changementValeurs('prenom')} value={prenom} type="text" id="form3Example1c" className="form-control" placeholder="Prenom" />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onChange={changementValeurs('email')} value={email} type="email" id="form3Example3c" className="form-control" placeholder="Adresse email" />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div className="form-outline flex-fill mb-0">
                                                    <input onChange={changementValeurs('mdp')} value={mdp} type="password" id="form3Example4c" className="form-control" placeholder="Mot de passe" />

                                                </div>
                                            </div>


                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button onClick={submitValeurs} type="button" className="btn btn-primary btn-lg"
                                                    style={{ paddingLeft: "2.5rem;", paddingRight: "2.5rem;", backgroundColor: "#ed6436" }}>S'inscrire</button>

                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <p className="small fw-bold mt-2 pt-1 mb-0">Vous avez déja un compte? <a href="/login"
                                                    className="link-danger">Connectez-vous</a></p>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-9 col-lg-6 col-xl-7 align-items-center order-1 mt-6 ">

                                        <img src={imageInscription} className="img-fluid" alt="Sample image" />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

    const affichageErreur = () => (
        <div className="alert alert-danger" style={{ display: erreur ? '' : 'none' }}>
            {erreur}
        </div>
    )
    const affichageSucces = () => (
        <div className="alert alert-success" style={{ display: succes ? '' : 'none' }}>
            Compte crée avec succès, veuillez vous connecter.
        </div>
    )

    return (
        <Layout title="Signup page" description="Ecommerce app" className="">
            {affichageErreur()}
            {affichageSucces()}
            {form()}
        </Layout>
    )
}
export default Signup;