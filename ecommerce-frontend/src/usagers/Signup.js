import React, {useState,useEffect} from "react";
import Layout from '../site/Layout';
import {Link} from 'react-router-dom';
import '../CSS/login_signup.css';
import {signupAPI} from '../Authentification';
const Signup = () =>{
    const [valeursUsager,setValeursUsager] = useState({
        nom: '',
        prenom: '',
        email: '',
        mdp : '',
        erreur : '',
        succes: false
    }); 
useEffect(() => { document.body.style.backgroundColor = '#ededed' })
const submitValeurs = (event) =>{
    event.preventDefault(); // Methode qui permets d'interdire le refresh.
    //setValeursUsager({...valeursUsager,erreur:false})
    signupAPI({nom,prenom,email,mdp})
    .then(data => {
        if(data.error){
            console.log(data.json + "data")
            setValeursUsager(({...valeursUsager,erreur:data.error,succes:false}))
            
        }
        else{
            setValeursUsager({...valeursUsager,nom:'',prenom:'',mdp:'',email:'',erreur:'',succes:true})
        }
        
    })
};
    const changementValeurs = contenu => event =>{
        setValeursUsager({...valeursUsager,erreur:false, [contenu]: event.target.value});
    }
    const {nom,email,prenom,mdp,succes,erreur} = valeursUsager;
    const form = () =>(
        <div className="section-inscription">
            <p className="header-inscription">Créer un compte x</p>
            <p className="paragraph-inscription">Créer un seul compte pour tous vos achats!</p>
        <form action="POST" className="flex-inscription">
            <div className="form-group form-inscription">
            <label className="text-muted">Nom</label>
            <input onChange={changementValeurs('nom')} value={nom} type="text" className="form-control"/>
            </div>
            <div className="form-group form-inscription">
            <label className="text-muted">Prénom</label>
            <input onChange={changementValeurs('prenom')} type="text" className="form-control" value={prenom}/>
            </div>
            <div className="form-group form-inscription">
            <label className="text-muted">Email</label>
            <input onChange={changementValeurs('email')} type="email" className="form-control" value={email}/>
            </div>
            <div className="form-group form-inscription">
            <label className="text-muted">Mot de passe</label>
            <input onChange={changementValeurs('mdp')} type="password" className="form-control" value={mdp}/>
            </div>
            <button type="button" class="btn btn-dark btn-inscription" onClick={submitValeurs}>S'inscrire</button>
        </form>
        </div>
        )
        
        const affichageErreur =  () =>(
            <div className="alert alert-danger" style={{display: erreur ? '' : 'none'}}>
                {erreur}
            </div>
        )
        const affichageSucces = () => (
            <div className="alert alert-success" style={{display: succes ? '' : 'none'}}>
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