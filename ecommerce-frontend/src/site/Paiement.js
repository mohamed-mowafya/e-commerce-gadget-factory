import React, { useState, useEffect } from "react";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import 'braintree-web'
import DropIn from "braintree-web-drop-in-react";
import { viderPanier } from "./panierHelper";
import { getBraintreeTokenClient, processPayment, commander } from "../site/apiSite";
import { Redirect } from "react-router-dom";
import "../CSS/panier.css"

/**
 * classe qui s'occupera du processus de paiement
 * 
 * @param {*} product 
 * Variable product qui prendre en paramètre le produit que l'usager désire acheter.
* @param {*} run 
 * Variable run permet useEffect ne mettra à jour le composant que lorsque l'état d'exécution change
 * @param {*} setRun 
 * Variable setRun permet d'informez le composant parent en l'exécutant
 * une fois le paiement effectué
 * @returns l'affichage du méthode de paiement
 */

const Paiement = ({ product, setRun = f => f, run = undefined }) => {


    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
    })

    const [adresse, setAdresse] = useState('')

    /** requête au backend */
    const userId = estAuthentifier() && estAuthentifier().user._id
    const token = estAuthentifier() && estAuthentifier().token

    const getToken = (userId, token) => {
        getBraintreeTokenClient(userId, token).then(data => {
            if (data.error) {
                setData({ ...data, error: data.error });
            } else {
                setData({ clientToken: data.clientToken });
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])


    /**
     * calcule du prix avant taxes
     * Affichage du prix avant taxes
     * @returns le prix à payer avant taxes
     */
    const getTotal = () => {
        return product.reduce((valeurActuelle, prochaineValeur) => {
            return valeurActuelle + prochaineValeur.count * prochaineValeur.price;
        }, 0);
    }

    const getQuantite = () => {
        return product.count
    }

    /**
     * méthode qui affiche l'entièreté de la partie du paiement
     * @returns l'interface de paiement seulement si l'utilisateur est connecté
     */
    const AfficherPaiement = () => {

        return estAuthentifier() ? (
            <div >
                {AfficherDropIn()}
                <button onClick={Acheter} className="btn btn-primary btn-md col-6 btn-centre mb-2">Payer</button>
            </div>
        ) : (
            <Link to="/login">
                <button className="btn btn-primary panier-centre">Connectez vous pour passer au paiement</button>
            </Link>
        );
    };

    const handleChange = event => {
        setAdresse(event.target.value);
    }

    /**  méthode qui affiche le Drop-in */
    const AfficherDropIn = () => (
        /**  permet de faire disparairtre le message d'erreur en cliquant nimporte ou sur la page */
        <div onBlur={() => setData({ ...data, error: "" })}>


            {data.clientToken !== null && product.length > 0 ? (

                <DropIn options={{
                    authorization: data.clientToken,
                }}
                    onInstance={instance => (data.instance = instance)}
                />
            ) : null}

        </div>

    );
    
    /**  Méthode qui permet de saisir l'adresse entré du client */
    const AfficherEntreeAdresse = () => (
        <div className="form-group mb-2">
            <label className="text-muted">Adresse de livraison</label>
            <textarea
                onChange={handleChange}
                value={adresse}
                className="form-control"
                placeholder="Entrez votre adresse de livraison"
            />
        </div>
    )

    /**Méthode qui contient une grosse partie de la logique du processus du paiement*/
    const Acheter = () => {
        setData({ loading: true });
        let nonce;

        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                nonce = data.nonce
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(product)

                }
                processPayment(userId, token, paymentData)
                    .then(response => {
                        const commandeUtil = {
                            products: product,
                            transaction_id: response.transaction.id,
                            montant_total: response.transaction.amount,
                            address: adresse
                        }
                        commander(userId, token, commandeUtil)
                        setData({ ...data, success: response.success });
                        viderPanier(() => {
                            setRun(!run);
                            console.log('paiement sucess, panier vide');
                            setData({
                                loading: false,
                                success: true
                            });


                        })
                    })
                    .catch(error => {
                        console.log(error)
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                setData({ ...data, error: error.message });
            });
    };
    /** méthode qui permet d'afficher un message d'erreur si la transaction a échoué  */
    const montrerErreur = error => (
        // 
        <div className="alert alert-danger" style={{ display: error ? '' : "none" }}>
            {error}
        </div>

    )
    /** méthode qui permet d'afficher un message de succèes si la transaction a réussie */ 
    const montrerSuccess = success => (
        <div className="alert alert-info"
            style={{ display: success ? '' : "none" }}>
            Votre paiement a été effectué avec succèes
        </div>
    );


    const afficherChargement = (loading) => (loading && <h2>Chargement...</h2>)


    /**
     * Si le paiement de l'utilisateur marche,
     * il est redirigé vers la page d'accueil
     * @param {} success 
     */
    const redirigerUtilisateur = success => {
        console.log(success)
        if (success) {
            return <Redirect to="/" />
        }

    }
    return <div>
        <h2 className="d-flex justify-content-center">Total: {getTotal()} $CAD</h2>
        {afficherChargement(data.loading)}
        {montrerSuccess(data.success)}
        {redirigerUtilisateur(data.success)}
        {montrerErreur(data.error)}
        {AfficherEntreeAdresse()}
        {AfficherPaiement()}
    </div>
}

export default Paiement;