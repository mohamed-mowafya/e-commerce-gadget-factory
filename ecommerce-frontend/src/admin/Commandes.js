import React, { useEffect, useState } from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import { createCategory, createProduct, getCategories } from "./AdminApi";
import '../CSS/admin.css';
import { getCommandes, getValeursEtat, updateEtatCommande } from './AdminApi';
import moment from 'moment' // Module qui permets d'afficher une date lisible.
import localization from 'moment/locale/fr';
const Commandes = () => {
    const [commandes, setCommandes] = useState([])
    const [valeursEtat, setValeursEtat] = useState([])
    const { user, token } = estAuthentifier()
    /**
     * Méthode qui va charger toutes les commandes du site 
     * à partir de l'api.
     */
    const chargerCommandes = () => {
        getCommandes(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setCommandes(data)
            }

        })
    }

    /**
     * Méthode qui permets de remplir la variable valeursEtat avec
     * les enums des états de commande qui sont dans le model de la bd
     * commande.
     */
    const chargerValeursEtat = () => {
        getValeursEtat(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setValeursEtat(data)
            }

        })
    }
    useEffect(() => {
        chargerCommandes()
        chargerValeursEtat()
        moment.updateLocale('fr', localization) // Permets de changer l'affichage de moment en français.
        ajoutJQuery()
    }, [])

    const ajoutJQuery = () => {
        const script = document.createElement("script");
        script.src = "./CacherTable.js";
        script.async = true;

        document.body.appendChild(script);
    }
    /**
     * Méthode qui permets d'afficher la quantité de commandes du site.
     */
    const afficherNombreCommandes = () => {
        if (commandes.length > 0) {
            return (
                <h1 classNameName="text-danger display-2">Nombre de commandes: {commandes.length}</h1>
            )
        }
        else {
            return (
                <h1 classNameName="text-danger display-2">Aucun commande sur le site.</h1>
            )
        }
    }

    const afficherInformations = (type, information) => (
        <div classNameName="input-group mb-2 mr-sm-2">
            <div classNameName="input-group-prepend">
                <div classNameName="input-group-text">{type}</div>
            </div>
            <input type="text" value={information} classNameName="form-control" readOnly />
        </div>
    )

    /**
     * Méthode qui permets de changer l'état d'une commande.
     */
    const handleEtat = (event, commandeId) => {
        updateEtatCommande(user._id, token, commandeId, event.target.value).then(data => {
            if (data.error) {
                console.log("Erreur de changement d'état")
            }
            else {
                chargerCommandes()
            }
        })
    }
    /**
     * Affiche l'état d'une commande à partir de la bd et permets de changer l'état.
     * La méthode affiche la séléction des états à partir des enums de la bd.
     */
    const afficherEtat = (commande) => (
        <h5 className="text-secondary d-flex justify-content-center font-oswald">
            État: {commande.statut}
        </h5>
    )

    return (
        <Layout
            title="Commandes">
            <h2 className="d-flex justify-content-center mt-2 fw-bold font-oswald">Commandes</h2>
            <div className="container mt-3">
                <div className="table-responsive">
                    <table className="table">
                        <thead className="table-color">
                            <tr>
                                <th className="text-center font-oswald">Numéro de commande</th>
                                <th className="text-center font-oswald">Nom</th>
                                <th className="text-center font-oswald">État</th>
                                <th className="text-center font-oswald">Total</th>
                                <th className="text-center font-oswald">Créé</th>
                                <th className="text-center font-oswald">Modifier État</th>
                            </tr>
                        </thead>
                        {commandes.map((commande, indexCommande) => (
                            <tbody className="table-body">

                                <tr class="cell-1">
                                    <td className="text-center font-oswald">{commande._id}</td>
                                    <td className="text-center font-oswald">{commande.user.nom}, {commande.user.prenom}</td>
                                    <td className="text-center font-oswald"> {afficherEtat(commande)}</td>
                                    <td className="text-center font-oswald">${commande.montant_total}</td>
                                    <td className="text-center font-oswald">{moment(commande.createdAt).fromNow()}</td>
                                    <td className="ms-auto me-auto font-oswald">   <select className="form-control"
                                        onChange={(event) => handleEtat(event, commande._id)}>
                                        <option>Modifier</option>
                                        {valeursEtat.map((etat, indexEtat) => (<option key={indexEtat} value={etat}>{etat}</option>))}
                                    </select></td>
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#demo" + commande._id} aria-expanded="true">
                                    </button>
                                </tr>
                                {commande.products.map((produit, produitIndex) => (
                                    <tr>
                                        <div id={"demo" + commande._id} className="accordion-collapse collapse hidden justify-content-center">
                                            <div className="d-flex column">
                                                <h6 className="text-expand ms-3">{produit.name}</h6>
                                            </div>
                                        </div>
                                    </tr>
                                ))}

                            </tbody>
                        ))}
                    </table>

                </div>
            </div>

        </Layout>
    )
}

export default Commandes