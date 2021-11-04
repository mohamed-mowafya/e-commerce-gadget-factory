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
         <button className="btn btn-success">{AfficherDropIn()}</button>
     ) : (
         <Link to= "/login">
             <button className= "btn btn-primary">Connectez vous pour passer au paiement</button>
         </Link>
     );
     };

     const AfficherDropIn = () => (
        <div >
           {data.clientToken !== null && product.length > 0 ? (

               <div>

                   <DropIn options={{
                       authorization: data.clientToken.clientToken}}
                       onInstance= {instance => (data.instance = instance)}
                   />
                   <button onClick={Acheter} className="btn btn-success">passer au paiement</button>
               </div>
           ):null }
                  
        </div>
    );

    const Acheter= ()=>{
        let nonce;

        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            console.log(data)
            nonce = data.nonce
            console.log('send nonce and total', nonce, getTotal(product))
            
                
            })
            .catch (error => {
                console.log('dropin error : ' , error)
                setData({...data,error:error.message}) 
            })
                
        }

   return <div>
        <h2>Total: {getTotal()} $CAD</h2>
        {AfficherPaiement()}
    </div>
}

export default Paiement;