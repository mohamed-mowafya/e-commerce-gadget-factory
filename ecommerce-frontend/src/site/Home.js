import React, {useEffect, useState} from "react";
import Layout from './Layout';
import { getProducts } from "./apiSite";
import Card from "./Card";


const Home = () =>{

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
        getProducts('createdAt').then(data => {console.log(data);
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
        <Layout title="Home Page" description="Ecommerce app">
            <h2 className="mb-4">Meilleures ventes</h2>
            {productsBySell.map((product,i) => (<Card key={i} produit={product} />))}

            <h2 className="mb-4">Les plus recents</h2>
            {productsByArrival.map((product,i) => (<Card key={i} produit={product} />))}
        </Layout>
        );
};
export default Home;