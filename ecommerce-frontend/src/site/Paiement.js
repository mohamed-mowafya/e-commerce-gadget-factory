import React, {useState, useEffect} from "react";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import DropIn from  "braintree-web-drop-in-react";
import { viderPanier } from "./panierHelper";
import {getBraintreeTokenClient , processPayment} from "../site/apiSite";
import { Redirect } from "react-router-dom";


const Paiement = ({product, setRun = f => f, run = undefined }) => {

   
    const [data, setData] = useState({
        loading : false,
        success: false,
        clientToken: null,
        error:'',
        instance:{},
        address:'',
    })

    //requete au backend
        const userId = estAuthentifier() && estAuthentifier().user._id
        const token = estAuthentifier() && estAuthentifier().token

        const getToken = ( userId , token) =>{
            getBraintreeTokenClient(userId, token).then(data => {
                if (data.error){
                    setData ({...data, error : data.error});
                } else {
                    setData({clientToken : data.clientToken});
                }
            })
        }

        useEffect (()=> {
            getToken(userId,token)
        },[])
   
   // calcule du prix avant taxes
   //Affichage du prix avant taxes
   const getTotal= () =>{
    return product.reduce((valeurActuelle, prochaineValeur)=>{
        return valeurActuelle + prochaineValeur.count * prochaineValeur.price; 
    },0);
   }
   
   
   const AfficherPaiement = ()=>{
       
     return estAuthentifier() ? (
         <div >{AfficherDropIn()}</div>
     ) : (
         <Link to= "/login">
             <button className= "btn btn-primary">Connectez vous pour passer au paiement</button>
         </Link>
     );
     };

     const AfficherDropIn = () => (
            // permet de faire disparairtre le message d'erreur en cliquant nimporte ou sur la page 
          <div onBlur= {() => setData ({...data, error: ""})}> 
      
            
           {data.clientToken !== null && product.length > 0 ? (
               
               <div>

                   <DropIn options={{
                       authorization: data.clientToken,
                       paypal:{
                           flow: "vault"
                       }
                    }}
                       onInstance= {instance => (data.instance = instance)}
                   />
                   <button onClick={Acheter} className="btn btn-primary btn-block">Payer</button>
               </div>
           ):null }
                
        </div>
       
    );
    
    // requete au backend
    const Acheter= ()=>{
        setData({loading : true});
        let nonce;

        let getNonce = data.instance
        .requestPaymentMethod()
        .then(data => {
            //console.log(data)
            nonce = data.nonce
            //console.log('send nonce and total', nonce, getTotal(produits))
            const paymentData = {
                paymentMethodNonce : nonce,
                amount : getTotal(product)
                
            }
            processPayment(userId , token, paymentData)
            .then (response => {
                setData({...data, success:response.success});
                viderPanier(() => {
                    setRun(!run); 
                    console.log('paiement sucess, panier vide');
                    setData({
                        loading: false,
                        success: true
                    });
                

                })
            })
            .catch (error => {console.log(error)
                    setData({loading : false});
            });
        })
        .catch(error => {
            //console.log ('dropping error' , error)
            setData({...data, error:error.message});
        });
    };
    
    const montrerErreur = error =>(
        // si il ya a erreur, montrer le message d'erreur
        <div className="alert alert-danger" style={{display : error ? '' : "none"}}> 
            {error}
        </div>

    )
    // montre le message si la transaction est succes 
    const montrerSuccess = success => (
        <div className="alert alert-info" 
        style={{display : success ? '' : "none"}}>
            Votre paiement a été effectué avec succèes
        </div>
    );

 
    const afficherChargement = (loading) => (loading && <h2>Chargement...</h2>)


    /**
     * Si le paiement de l'utilisateur marche,
     * il est redirigé vers la page d'accueil
     * @param {} success 
     */
    const redirigerUtilisateur = success =>{
        if(success){
            return <Redirect to = "/"/>
        }
        
    }
   return <div>
        <h2>Total: {getTotal()} $CAD</h2>
        {afficherChargement(data.loading)}
        {montrerSuccess(data.success)}
        {redirigerUtilisateur(data.success)}
        {montrerErreur(data.error)}
        {AfficherPaiement()}
    </div>
}

export default Paiement;