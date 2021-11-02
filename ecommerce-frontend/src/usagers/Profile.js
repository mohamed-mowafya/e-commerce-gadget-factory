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
    const [visible,setVisible] = useState(false);
    var {nom,prenom,email,hashed_password,error,succes,mdp,mdp2} = values;

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

    const handleChange = name => (event) =>{
        setValues({...values,[name]: event.target.value},)
    }

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

    const verifierMDP = () =>{
        if(mdp == mdp2 && mdp.length>0){
            // Source : https://regex101.com/r/dD5bF4/1
            var regexMDP = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])");
            if(!regexMDP.test(mdp)){
                setVisible(true)
                setValues({...values,error:true,succes:false})
                document.getElementById("erreurMDP").innerHTML = "Votre mot de passe doit contenir au moins 8 caractères, "  
                + "un chiffre et une lettre en majuscule."
            }
            else{
                setVisible(false)
                setValues({...values,error:false,succes:false})
                hashed_password = mdp;
            }
        }
        else{
            
                setValues({...values,error:true,succes:false})
                setVisible(true)
                document.getElementById("erreurMDP").innerHTML = "Les deux champs de mot de passe doivent être pareils."
            
        }
        
    }

    const rediriger = (succes) =>{
        if(succes){
            return <Redirect to="/"/>
        }
    }
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