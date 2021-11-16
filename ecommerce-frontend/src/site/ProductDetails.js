import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { read, listRelated } from "./apiSite";
import Layout from "./Layout";
import ShowImage from './ShowImage';
import { ajoutItem } from "./panierHelper";
import moment from "moment";
import ProduitSimilaire from "./ProduitSimilaire";

const ProductDetails = (props) => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                //fetch les produits qui ont un lien avec le produit
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    const AjouterAuPanier = () => {
        ajoutItem(product, () => { // prend en params le produit et la fonction callback
            setRedirect(true)
        });
    };

    const DoitRediriger = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        };
    };
    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props]);

    return (
        <Layout
            title=""
            description=""
            className="container-fluid "
        >
            {/* <div className="d-flex align-items-center h-100">
                <div className="container text-center py-5">
                    <h3 className="mb-0">Détails sur le produit</h3>
                </div>
            </div> */}
            <div className="container mt-5">
                <section className="mb-5">
                    {DoitRediriger(redirect)}
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0">

                            <div id="mdb-lightbox-ui"></div>

                            <div className="mdb-lightbox">

                                <div className="row product-gallery mx-1 d-flex justify-content-center">

                                    <div className="col-10 mb-0" >
                                        <ShowImage className="card-img" item={product} url="product" />

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mt-6">

                            <h5>{product.name}</h5>
                            <p><span className="mr-1"><strong>${product.price}</strong></span></p>
                            <p className="pt-1">{product.description}</p>
                            <hr />
                            <button type="button" className="btn btn-light btn-md mr-1 mb-2" style={{ backgroundColor: "#ed6436" }} onClick={AjouterAuPanier}><i
                                className="fas fa-shopping-cart pr-2" ></i> Ajouter au Panier</button>
                        </div>
                    </div>

                </section>





                <section class="text-center">
                    <h4 className="text-center my-5">
                        <strong>Produits similaires</strong>
                    </h4>
                    <div class="row">
                         {relatedProduct.map((p, i) => (

                            <ProduitSimilaire key={i} product={p} />

                        ))}
                    </div>


                </section>
            </div>
        </Layout>
    );
};

export default ProductDetails;