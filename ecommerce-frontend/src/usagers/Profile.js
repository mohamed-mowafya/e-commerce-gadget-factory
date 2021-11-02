import React, {useState,useEffect} from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link, Redirect } from "react-router-dom";
import {read,update,updateUser} from "./apiUsager"
const Profile = ({match}) =>{
    const [values, setValues] = useState({
        nom:"",
        prenom:"",
        email:"",
        mdp:"",
        mdp2:"",
        hashed_password:"",
        error:false,
        succes: false
    }
    );
    const {token} = estAuthentifier()
    const [visible,setVisible] = useState(false); // Permets d'afficher et cacher le message d'erreur
    var {nom,prenom,email,hashed_password,error,succes,mdp,mdp2} = values;

    /**
     * Méthode qui permets d'initialiser les informations de l'usager
     * et de les afficher sur la page à partir de la bd.
     * @param {*} userId 
     */
    const initaliser = (userId) =>{
        read(userId,token).then(data=>{
            if(data.error){
                setValues({...values,error:true});
            }
            else{
                setValues({...values,nom: data.nom,prenom: data.prenom, email:data.email});
            }
        })
    }

    /**
     * Méthode qui change les variables d'usagers
     * lorsque l'utilisateur fait des changements dans
     * le form.
     * @param {*} name 
     */
    const handleChange = name => (event) =>{
        setValues({...values,[name]: event.target.value},)
    }

    /**
     * Méthode qui va retourner le form
     * afin que React puisse l'afficher.
     * @param {*} nom 
     * @param {*} prenom 
     * @param {*} email 
     * @param {*} hashed_password  
     */
    const modifierProfile = (nom,prenom,email,hashed_password) => (
        <form>
        <div className="form-group">
            <label className="text-muted">Nom</label>
            <input type="text" onChange={handleChange('nom')} className="form-control" value={nom}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Prenom</label>
            <input required type="text" onChange={handleChange('prenom')} className="form-control" value={prenom}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Email</label>
            <input required type="email" onChange={handleChange('email')} className="form-control" value={email}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Mot de passe</label>
            <input id="mdp" type="password" onChange={handleChange('mdp')} className="form-control"/>
        </div>
        <div className="form-group">
            <label className="text-muted">Confirmer mot de passe</label>
            <input id="mdp2" type="password" onChange={handleChange('mdp2')} className="form-control"/>
        </div>
        <button onClick={envoyerInformations} className="btn btn-primary">Modifier</button>
        </form>
    )

    /***
     * Méthode qui va envoyer les informations changés par l'utilisateur
     * vers le backend
     * */   
    const envoyerInformations = event =>{
        event.preventDefault()
        verifierMDP()
        if(!error){
        update(match.params.userId, token, {nom,prenom,email,hashed_password}).then(data=>{
            
            if(data.error){
                console.log(data.error);
            }
            else{
                updateUser(data,()=>{
                    setValues({...values,nom:data.nom,email:data.email})
                })
            }
        })
    }
    }

    /***
     * Méthode qui va permettre de vérifier si le nouveau mot de passe
     * de l'utilisateur corresponds au critères de mot de passe.
     * Source : https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
     */
    const verifierMDP = () =>{
        if(mdp == mdp2 && mdp.length>0){ 
            var regexMDP = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_]).{8,}");
            if(!regexMDP.test(mdp)){
                setVisible(true)
                setValues({...values,error:true,succes:false})
                document.getElementById("erreurMDP").innerHTML = "Votre mot de passe doit contenir au moins 8 caractères, "  
                + "un chiffre, une lettre en majuscule et un symbole."
            }
            else{
                setVisible(false)
                setValues({...values,error:false,succes:true})
                hashed_password = mdp;
            }
        }
        else{
            
                setValues({...values,error:true,succes:false})
                setVisible(true)
                document.getElementById("erreurMDP").innerHTML = "Les deux champs de mot de passe doivent être pareils et remplis."
            
        }
        
    }

    /***
     * Méthode qui réderige l'utilisateur apres'il a changer ses informations.
     */
    const rediriger = (succes) =>{
        if(succes){
            return <Redirect to="/"/>
        }
    }

    /***
     * Méthde qui affiche un message d'erreur au besoin.
     */
    const erreurMDP = () =>{
        return <div id="erreurMDP" style={{display: visible ? "block" : "none"}}  class="alert alert-danger" role="alert"></div>
    }


    useEffect(() => {
        initaliser(match.params.userId)
    },[])
    return (
        <Layout title="Modification de profile" description="Modifier votre profile" className="container-fluid">
            <h2 className="mb-4">Modifier votre profile</h2>
            {erreurMDP()}
            {modifierProfile(nom,prenom,email,hashed_password)}
            {rediriger(succes)}
        </Layout>
        );
    
}

export default Profile;