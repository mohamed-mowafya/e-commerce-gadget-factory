import React, { useState, useEffect } from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUsager"
import { loginAPI, authentifier } from "../Authentification";
import "../CSS/profile.css"
const Profile = ({ match }) => {
    const [values, setValues] = useState({
        nom: "",
        prenom: "",
        email: "",
        mdp: "",
        mdp2: "",
        mdp_a:"",
        hashed_password: "",
        error: false,
        ancien_mdp_err:false,
        succes: false
    }
    );
    const { token } = estAuthentifier()
    const [visible, setVisible] = useState(false); // Permets d'afficher et cacher le message d'erreur
    const [estAuth,setEstAuth] = useState(false);
    var { nom, prenom, email, hashed_password, error, succes, mdp, mdp2,mdp_a,ancien_mdp_err} = values;

    /**
     * Méthode qui permets d'initialiser les informations de l'usager
     * et de les afficher sur la page à partir de la bd.
     * @param {*} userId 
     */
    const initaliser = (userId) => {
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            }
            else {
                setValues({ ...values, nom: data.nom, prenom: data.prenom, email: data.email });
            }
        })
    }

    /**
     * Méthode qui change les variables d'usagers
     * lorsque l'utilisateur fait des changements dans
     * le form.
     * @param {*} name 
     */
    const handleChange = name => (event) => {
        setValues({ ...values, [name]: event.target.value ,error:false})
    }

    /**
     * Méthode qui va retourner le form
     * afin que React puisse l'afficher.
     * @param {*} nom 
     * @param {*} prenom 
     * @param {*} email 
     * @param {*} hashed_password  
     */
    const modifierProfile = (nom, prenom, email, hashed_password) => (
        <div class="wrapper bg-white mt-sm-5">
        <h4 class="pb-4 border-bottom mt-auto d-flex justify-content-center profile-titre">Modifier votre profile</h4>
        <div class="py-2">
            <div class="column py-2">
                <div class="col-md-12"> <label for="firstname">Nom</label> <input type="text" class="bg-light form-control" value={nom} onChange={handleChange("nom")}/> </div>
                <div class="col-md-12 pt-md-0 pt-3"> <label for="lastname">Prénom</label> <input type="text" class="bg-light form-control"value={prenom} onChange={handleChange("prenom")}/> </div>
                <div class="col-md-12"> <label for="email">Email Address</label> <input type="text" class="bg-light form-control" value={email} onChange={handleChange("email")}/> </div>
                <label for="password">Ancien mot de passe</label> <input type="password" class="bg-light form-control" onChange={handleChange("mdp_a")}/>
                <label for="password">Mot de passe</label> <input type="password" class="bg-light form-control" onChange={handleChange("mdp")}/>
                <label for="password">Confirmer</label> <input type="password" class="bg-light form-control" onChange={handleChange("mdp2")}/>
            </div>
            <div class="py-3 pb-4 d-flex justify-content-center me-2"> <button class="btn btn-primary ms-auto me-auto" onClick={envoyerInformations}>Sauvegarder</button></div>
        </div>
    </div>
    )

    /***
     * Méthode qui va envoyer les informations changés par l'utilisateur et s'assurer
     * qu'il connaît son ancien mdp.
     * vers le backend
     * */
    const envoyerInformations = event => {
        event.preventDefault()
        setValues({...values,error:false})
        verifierMDP()
        loginAPI({ email, mdp: mdp_a })
        .then(data => {
                if (data.error) {
                    setVisible(true)
                    setValues({ ...values, error: true, succes: false })
                    document.getElementById("erreurMDP").innerHTML = "Votre ancienne mot de passe est incorrecte!";
                } else {
                    console.log(error + " iciii")
                    if (!error) {
                        update(match.params.userId, token, { nom, prenom, email, hashed_password }).then(data => {
                            if (data.error) {
                                console.log(data.error);
                            }
                            else {
                                updateUser(data, () => {
                                    setValues({ ...values, nom: data.nom, email: data.email,succes: true })
                                })
                            }
                        })
                    }
                }
            });
        }
 


    /***
     * Méthode qui va permettre de vérifier si le nouveau mot de passe
     * de l'utilisateur corresponds au critères de mot de passe.
     * Source : https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
     */
    const verifierMDP = () => {

        if (mdp == mdp2 && mdp.length > 0) {
            var regexMDP = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_]).{8,}");
            if (!regexMDP.test(mdp)) {
                setVisible(true)
                setValues({ ...values, error: true })
                document.getElementById("erreurMDP").innerHTML = "Votre mot de passe doit contenir au moins 8 caractères, "
                    + "un chiffre, une lettre en majuscule et un symbole."
            }
            else {
                setVisible(false)
                setValues({ ...values, error: false })
                hashed_password = mdp;
            }
        }
        else{
            setValues({ ...values, error: true })
            setVisible(true)
            document.getElementById("erreurMDP").innerHTML = "Les deux champs de mot de passe doivent être pareils et remplis."

        }


    }

    /***
     * Méthode qui réderige l'utilisateur apres'il a changer ses informations.
     */
    const rediriger = (succes) => {
  
        if (succes) {
            return <Redirect to="/" />
        }
    }

    /***
     * Méthde qui affiche un message d'erreur au besoin.
     */
    const erreurMDP = () => {
        return <div id="erreurMDP" style={{ display: visible ? "block" : "none" }} class="alert alert-danger" role="alert"></div>
    }


    useEffect(() => {
        initaliser(match.params.userId)
    }, [error])
    return (
        <Layout title="Modification de profile" description="Modifier votre profile" className="container-fluid">
            {erreurMDP()}
            {modifierProfile(nom, prenom, email, hashed_password)}
            {rediriger(succes)}
        </Layout>
    );

}

export default Profile;