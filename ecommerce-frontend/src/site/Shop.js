import React,{useState, useEffect} from "react";
import Card from "./Card";
import Layout from "./Layout";
import { getCategories } from "./apiSite";




const Shop = () => {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);

    // sera untitilise quand le component sera mount
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init();
        
    }, []);


    return (
        <Layout
            title=""
            description=""
            className="container-fluid"
        >
            <div className="row">
                <div className="col-4">{JSON.stringify(categories)}</div>


                <div className="col-4">sidebar droit</div>
                <div className="col-4">gauche</div>
                </div>
                   
        </Layout>
    );
};

export default Shop;