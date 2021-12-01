
import React, { useState, useEffect } from "react";
import Card from "./Card";
import Layout from "./Layout";
import { getCategories, getProduitsFiltrer } from "./apiSite";
import Checkbox from "./CheckBox";
import { prix } from "./PrixFix";
import RadioBox from "./RadioBox";
import "../CSS/shop.css"
import "../CSS/animationImage.css"
import ProductDetails from "./ProductDetails";
import FormeSimple from "./chatbot/FormSimple";
import bck from "../images/bck2.png"

/**
 * Cette classe englobe l'entièreté de la page Shop ce qui permet de gerer l'affichage des cartes et des differents filtres.
 * @returns Retourne l'affichage de la page Shop.
 */
const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(12); //limiter 12 produits a chaque request
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);


    /**
     * Cette méthode permet d'obtenir les produits selon le filtre choisis par l'utilisateur.
     */
    const ChargerResultatFiltres = (nouveauFiltres) => {
        getProduitsFiltrer(skip, limit, nouveauFiltres).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size); // le nombre de produits qu'on affiche
                setSkip(0);
            }
        })

    };


    /**
     * Cette méthode permet de pouvoir charger un certain nombre de produit avant d'afficher le boutton "Plus".
     */
    const chargerPlus = () => {
        let toSkip = skip + limit;

        getProduitsFiltrer(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };


    /**
     * Cette méthode permet de changer l'allure du bouton.
     * @returns Cette méthode retourne l'affichage du boutton Plus.
     */
    const bouttonChargerPlus = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={chargerPlus} className="btn btn-warning mb-5">
                    PLUS +
                </button>
            )
        );
    };

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
        ChargerResultatFiltres(skip, limit, myFilters.filters);
    },
        []);

    
    /**
     * Cette méthode permet d'afficher les filtres existants selon la catégorie.
     */
    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        //extract la valeur de l'array de la clé
        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        ChargerResultatFiltres(myFilters.filters);

        setMyFilters(newFilters)
    };

    /**
     *  Cette méthode permet d'obtenir les prix qu'on veut afficher comme filtre.
     */
    const handlePrice = valeur => {
        const data = prix;
        let array = [];

        // extrait la valeur qui match avec le key._id qu'il y a dans PrixFixe
        for (let key in data) {
            if (data[key]._id === parseInt(valeur)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout
            title=""
            description=""
            className="container-fluid "
        >

            <div class="products-right-grids-position animated wow slideInRight" data-wow-delay=".5s">
						<img src={bck} alt=" " class="img-responsive img1" />
						<div class="products-right-grids-position1">
							<h4>Trouvez ce dont vous cherchez</h4>
							<p>Découvrez les aubaines magiques sur les tablettes, les portables, les écouteurs et plus encore.</p>
						</div>
					</div>

            <div className="row">

                <section id="sidebar" className="">
                    <div className="py-3">
                        <h5 className="font-weight-bold d-flex justify-content-start">Categories</h5>
                        <ul className="list-group d-flex justify-content-start">
                            <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, "category")} />
                        </ul>
                    </div>
                    <div className="py-3">
                        <h5 className="font-weight-bold d-flex justify-content-start">Prix</h5>
                        <form className="brand d-flex justify-content-start flex-column">
                            <RadioBox prices={prix} handleFilters={filters => handleFilters(filters, "price")} />
                        </form>
                    </div>
                </section>
                <div className="col-8">
                    <div className="container mt-50 mb-50">
                        <div className="row d-flex justify-content-between">
                            {filteredResults.map((product, i) => (


                                <Card product={product} />


                            ))}
                            {bouttonChargerPlus()}

                        </div>
                    </div>
                </div>
            </div>
            <FormeSimple/>
        </Layout>
    );
};

export default Shop;