import React, { useState, useEffect } from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import { createCategory } from "./AdminApi";
import { getProduits, effacerProduit } from "./AdminApi";


const GestionProduits = () => {

    const [produit, setProduits] = useState([]) // pour store le data dans le state

    const { user, token } = estAuthentifier();

    const loadProducts = () => {
        getProduits().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProduits(data);
            }
        });
    };

    const detruire = productId => {
        effacerProduit(productId, user._id, token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                loadProducts();
            }
        })
    }

    useEffect(() => {
        loadProducts(); // methode execter quand le component mount
    }, [])

    return (
        <Layout title="" className="">


            <div className="row">
                <div className="col-12">
                <h2 className="text-center">
                     {produit.length} produit(s)
                    </h2>
                    <ul className="list-group">

                        {produit.map((p,i) =>(
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                            
                                {p.name}
                              
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="btn badge-warning badge-pill">
                                        Modifier
                                    </span>
                                </Link>
                                <span
                                    onClick={() => detruire(p._id)}
                                    className="btn badge-danger badge-pill"
                                >
                                    Supprimer
                                </span>
                            </li>
                        ))}
                    </ul>


                </div>

            </div>
            
        </Layout>
    );

}

export default GestionProduits;