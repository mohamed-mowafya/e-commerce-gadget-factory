import React from "react";
import Layout from './Layout';

const Shop = () => {
    return (
        <Layout
            title="Produit Page"
            description="Ecommerce app"
        >
            <div className="row">
                <div className="col-4">
                    left sidebar
                </div>

                <div className="col-8">
                    right
                </div>
            </div>
        </Layout>
    );
};

export default Shop;