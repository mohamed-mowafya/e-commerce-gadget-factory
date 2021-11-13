import React, { useEffect, useState } from "react";
import Layout from './Layout';
import { getProducts } from "./apiSite";
import Card from "./Card";
import Search from "./Search";


const Home = () => {

    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false); // false par defaut



    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    // run lorsqu'on load pour la premierefois ou lors des changeemnt de state
    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);


    return (
        <Layout title="Home Page" description="Ecommerce app" className="container-fluid">
            <h2 className="mb-4 couleur" >Meilleures ventes</h2>
            <div className="col-12">
                <div className="container d-flex justify-content-center mt-50 mb-50">
                    <div className="row">
                        {productsBySell.map((product, i) => (

                            <Card product={product} />

                        ))}
                    </div>
                </div>
            </div>

            <h2 className="mb-4">Les plus recents</h2>
            <div className="col-12">
                <div className="container d-flex justify-content-center mt-50 mb-50">
                    <div className="row">
                        {productsByArrival.map((product, i) => (

                            <Card product={product} />

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
export default Home;