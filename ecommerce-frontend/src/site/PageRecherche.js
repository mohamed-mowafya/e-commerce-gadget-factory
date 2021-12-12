import Card from "./Card";
import { useLocation } from "react-router-dom";
import '../CSS/navbar.css';
import Layout from "./Layout";
import React, { useState, useEffect } from 'react';

/**
 * Cette permet d'afficher les produits en lien avec la recherche de l'utilisateur.
 * @returns Retourne l'affichage de la page de recherche.
 */
const PageRecherche = () => {
    const location = useLocation();
    const params = location.state.params;
    const results = params.results;
    const search = params.search;


    const searchedProducts = (results = []) => {
        if (results.length == 0) {

        }
        return (
            <div>
                <h2 className="d-flex justify-content-center mt-4">Resultats de recherche</h2>
                <hr />
                <div className="col-9 ms-auto me-auto mt-4">
                    <div className="row d-flex justify-content-sm-between">
                        {results.map((product, i) => (
                            <Card key={i} product={product} />
                        ))}
                    </div>
                </div>
            </div>
        );
    };
    const searchMessage = () => {
        if (results.length == 0) {
            return <h6 className="alert alert-danger">Aucun produit trouvé</h6>
        }
    }
    return (
        <Layout>
            <div className="container-fluid mt-2">
                {searchMessage()}
                {searchedProducts(results)}
            </div>
        </Layout>
    );
}
export default PageRecherche;