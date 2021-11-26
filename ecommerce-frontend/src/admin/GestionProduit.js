import React, { useState, useEffect } from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import { createCategory } from "./AdminApi";
import { getProduits, effacerProduit } from "./AdminApi";
import '../CSS/admin.css'

const GestionProduits = () => {

    const [produit, setProduits] = useState([]) // pour sauvegarder les données dans le state

    const { user, token } = estAuthentifier();

    /**
     * Méthode qui permets de charger les produits du site.
     */
    const loadProducts = () => {
        getProduits().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProduits(data);
            }
        });
    };

    /**
     * Méthode qui permets d'effacer un produit.
     * @param {*} productId 
     */
    const detruire = productId => {
        effacerProduit(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadProducts();
            }
        })
    }


    /**
     * Méthode useEffect() est utilisé afin de charger les produits lorsque
     * la page a chargé complètement pour l'utilisateur.
     */
    useEffect(() => {
        loadProducts(); // methode execter quand le component mount
    }, [])

    return (
        <Layout title="" className="">
            <div className="container mt-4">
                <div className="table-responsive">
                    <table className="table w-100">
                        <thead className="table-color-prod">
                            <tr className="table-head">
                                <th colspan="3" className="text-center text-prod font-oswald">Liste de produits</th>
                            </tr>
                        </thead>
                        {produit.map((p, i) => (
                            <tbody className="table-body">

                                <tr class="cell-produits cell-produits">
                                    <td className="text-center font-oswald prod-nom">{p.name}</td>
                                    <div className="d-flex justify-content-end">
                                    <td className="text-center font-oswald">
                                     
                                    <Link to={`/admin/product/update/${p._id}`}>    
                                    <span className="badge rounded-pill bg-primary">
                                        Modifier 
                                        </span>
                                    </Link>
                                      
                                        </td>
                                    <td className="text-center font-oswald">
                                    <span
                                    onClick={() => detruire(p._id)}
                                    className="badge rounded-pill bg-danger span-cursor"
                                    >
                                    Supprimer
                                    </span>
                                        
                                        </td>   
                                        </div>
                                    
                                </tr>

                            </tbody>
                        ))}
                    </table>

                </div>
            </div>

        </Layout>
    );

}

export default GestionProduits;