import React, { useEffect, useState } from "react";
import Layout from './Layout';
import { getProducts } from "./apiSite";
import Card from "./Card";
import banner from '../images/banner.jpg';
import Search from "./Search";
import "../CSS/Home.css";
import ProduitSimilaire from "./ProduitSimilaire";


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
        <Layout title="Home Page" className="container-fluid">
            <section className="view">

                <div className="row">

                    <div className="col-md-6">

                        <div className="d-flex flex-column justify-content-center align-items-center h-100">
                            <h1 className="heading display-3 mt-5">C'est le moment de vous procurer toute la techno que vous vouliez.</h1>
                            <h4 className="subheading font-weight-bold">Découvrez les aubaines magiques sur les tablettes, les portables, les écouteurs et plus encore.</h4>
                            <div className="m-auto">
                                <button type="button" className="btn btn-lily btn-margin btn-rounded mb-5 m-auto">Allons-y <i className="fas fa-caret-right ml-3"></i></button>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="view">
                            <img src={banner} className="img-fluid mt-5" alt="banner image" />
                            <div className="mask flex-center hm-gradient">
                            </div>
                        </div>

                    </div>

                </div>

            </section>
            <section className="section-content">
                <div className="container">
                    <header className="section-heading">
                        <h3 className="section-title couleur">Produits Populaire</h3>
                    </header>

                    <div className="row">
                        {productsBySell.map((product, i) => (
                            
                                <ProduitSimilaire product={product} />
                           

                        ))}
                    </div>
                </div>
            </section>
            <h2 className="mb-4 couleur" >Meilleures ventes</h2>
            <div className="col-12">
                <div className="container mt-50 mb-50">
                    <div className="row d-flex justify-content-sm-around">
                        {productsBySell.map((product, i) => (

                            <Card product={product} />

                        ))}
                    </div>
                </div>
            </div>

            <h2 className="mb-4">Les plus recents</h2>
            <div className="col-12">
                <div className="container mt-50 mb-50">
                    <div className="row d-flex justify-content-center">
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