import React, {useEffect, useState} from "react";
import Layout from './Layout';
import { getProducts } from "./apiSite";


const Home = () =>{


    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false); // false par defaut
    
    
    
    const chargerProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const chargerProductsByArrival = () => {
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
        chargerProductsByArrival();
        chargerProductsBySell();
    }, []);


    return (
        <Layout title="Home Page" description="Ecommerce app">
            {JSON.stringify(productsByArrival)}
            <hr></hr>
            {JSON.stringify(productsBySell)}
        </Layout>
        );
};
export default Home;