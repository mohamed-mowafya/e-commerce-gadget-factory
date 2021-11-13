import Card from "./Card";
import { useLocation } from "react-router-dom";
import '../CSS/navbar.css';
import Layout from "./Layout";
import React, { useState, useEffect } from 'react';
const PageRecherche = () =>{
    const [erreur, setErreur] =  useState(false);
   const location = useLocation();
   const params = location.state.params;
   const results = params.results;
   const search = params.search;
 

  
     const searchedProducts = (results = []) => {
        if(results.length == 0){
           // setErreur(true);
        }
        return (
            <div>
                <h2 className="mt-4 mb-4">
                </h2>
                <div className="row">
                    {results.map((product, i) => (
                        <Card key={i} product={product} />
                    ))}
                </div>
            </div>
        );
    };
    const searchMessage = () => {
        if(results.length == 0){
            return <h6 className="alert alert-danger">Aucun produit trouvé</h6>
        }
    }
return(
    <Layout>
    <div className="container-fluid mt-2">
    {searchMessage()}
    {searchedProducts(results)}
    </div>
    </Layout>
);
}
export default PageRecherche;