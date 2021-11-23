import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiSite";
import Card from "./Card";

const Product = (props) => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

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

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props]);

    return (
        <Layout title="Home Page" description="Ecommerce app" className="container-fluid">

            <div className="row">
                <div className="col-8">
                    {
                        product &&
                        product.description && (
                            <Card product={product} showViewProductButton={false} />
                        )}
                </div>

                <div className="col-4">
                    <h4>Produits similaire</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3">
                            <Card key={i} product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export default Product;