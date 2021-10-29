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
        error:false,
        succes: false
    });
    const {token} = estAuthentifier()

    const {nom,prenom,email,mdp,error,succes} = values;

    const initaliser = (userId) =>{
        console.log(userId +"ici")
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

    const modifierProfile = (nom,prenom,email,mdp) => (
        <form>
        <div className="form-group">
            <label className="text-muted">Nom</label>
            <input type="text" onChange={handleChange('nom')} className="form-control" value={nom}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Prenom</label>
            <input type="text" onChange={handleChange('prenom')} className="form-control" value={prenom}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Email</label>
            <input type="email" onChange={handleChange('email')} className="form-control" value={email}/>
        </div>
        <button onClick={envoyerInformations} className="btn btn-primary">Modifier</button>
        </form>
    )

    const envoyerInformations = event =>{
        event.preventDefault()
        update(match.params.userId, token, {nom,prenom,email,mdp}).then(data=>{
            
            if(data.error){
                console.log(data.error);
            }
            else{
                updateUser(data,()=>{
                    setValues({...values,nom:data.nom,email:data.email,succes:true})
                })
            }
        })

    }

    const rediriger = (succes) =>{
        if(succes){
            return <Redirect to="/"/>
        }
    }

    useEffect(() => {
        initaliser(match.params.userId)
    },[])
    return (
        <Layout title="Modification de profile" description="Modifier votre profile" className="container-fluid">
            <h2 className="mb-4">Modifier votre profile</h2>
            {modifierProfile(nom,prenom,email,mdp)}
            {rediriger(succes)}
        </Layout>
        );
    
}

export default Profile;