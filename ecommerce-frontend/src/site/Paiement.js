import React, {useState, useEffect} from "react";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import DropIn from  "braintree-web-drop-in-react";
import {getBraintreeTokenClient} from "../site/apiSite";


const Paiement = ({product}) => {

    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error:'',
        instance:{},
        address:''

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
          <div onBlur= {() => setData ({...data, error: ""})}>
      
            
           {data.clientToken !== null && product.length > 0 ? (
               
               <div>

                   <DropIn options={{
                       authorization: data.clientToken}}
                       onInstance= {instance => (data.instance = instance)}
                   />
                   <button onClick={Acheter} className="btn btn-primary">passer au paiement</button>
               </div>
           ):null }
                
        </div>
       
    );
    
    // requete au backend
    const Acheter= ()=>{

        //envoie le nonce au server

        let nonce;

        let getNonce = data.instance
        .requestPaymentMethod() // determine le type de paiement(type de carte)
        .then(data => {
            console.log(data)
            nonce = data.nonce // -> type de carte, numero de carte...
            console.log('send nonce and total', nonce, getTotal(product))
            
                
            })
            .catch (error => {
                console.log('dropin error : ' , error)
                setData({...data,error:error.message}) 
            })
                
        }
    
    const montrerErreur = error =>(
        // si il ya a erreur, montrer le message d'erreur
        <div className="alert alert-danger" style={{display : error ? '' : "none"}}> 
            {error}
        </div>

    )

   return <div>
        <h2>Total: {getTotal()} $CAD</h2>
        {montrerErreur(data.error)}
        {AfficherPaiement()}
    </div>
}

export default Paiement;