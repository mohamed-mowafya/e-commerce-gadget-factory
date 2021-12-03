import React, { useState, useEffect } from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import { getHistoriqueAchat } from './apiUsager'
import moment from 'moment'
import localization from 'moment/locale/fr'; // Module moment qui va faire en sorte que la date d'achat est plus lisible.

const Dashboard = () => {
    const [historique, setHistorique] = useState([])

    //Pour pouvoir update le profile 
    const { user: { _id, nom, prenom, email, role } } = estAuthentifier();

    const token = estAuthentifier().token
    const init = (userId, token) => {
        getHistoriqueAchat(userId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setHistorique(data)
            }
        })
    }

    /**
     * Méthode useEffect() qui va permettre d'afficher l'historique
     * d'achat de l'utilisateur lorsque la page sera complètement
     * chargé pour lui.
     */
    useEffect(() => {
        init(_id, token)
        moment.updateLocale('fr', localization) // Permets de changer l'affichage de moment en français.
    }, [])

    /**
   * Méthode qui affiche les liens (html) que l'administrateur peut accèder dans son dashboard.
   */
    const liensUsagers = () => {
        return (

            <div className="mt-2">
                <h4 className="card-header">Lien de l'usager</h4>
                <ul className="list-group">

                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">Mon panier</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>Modifier mon profile</Link>
                    </li>

                </ul>

            </div>

        )

    }

    /**
     * Méthode qui retourne les informations de l'usager.
     */
    const informationsUsager = () => {
        return (
            <div className="mb-5 mt-2">
                <h3 className="card-header">Informations</h3>
                <ul className="list-group">
                    <li className="list-group-item">Nom: {nom}, {prenom}</li>
                    <li className="list-group-item">Courriel: {email}</li>
                    <li className="list-group-item">
                        {role === 1 ? 'Role: Administrateur' : "Role: Usager"}</li>

                </ul>
            </div>
        )
    }

    /**
     * Méthode qui permets d'afficher l'historique d'achat de l'utilisateur.
     * @param {*} historique 
     * Variable historique qui va contenir l'historique de l'utilisateur.
     */
    const historiqueAchat = (historique) => {
        return (
            <div>
                <h3 className="card-header">Votre historique d'achat</h3>

                <ul className="list-group">

                    <li className="list-group-item">
                        {historique.map((historiqueItem, index) => {
                            return (
                                <div>
                                    {historiqueItem.products.map((produit, index) => {
                                        return (
                                            <div key={index}>
                                                <h6>Produit: {produit.name}</h6>
                                                <h6>Prix: ${produit.price}</h6>
                                                <h6>Acheté: {moment(historiqueItem.createdAt).fromNow()}</h6>
                                                <hr />
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </li>


                </ul>


            </div>
        )
    }


    return (
        <Layout title="Dashboard de l'utilisateur" description={`Bonjour ${nom}!`} className="container-fluid">


            <div className="row">
                <div className="col-3">
                    {liensUsagers()}

                </div>
                <div className="col-9">
                    {informationsUsager()}
                    {historiqueAchat(historique)}

                </div>
            </div>
        </Layout>
    );


};

export default Dashboard;