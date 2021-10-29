
import React,{useState, useEffect} from "react";
import Card from "./Card";
import Layout from "./Layout";
import { getCategories, getProduitsFiltrer } from "./apiSite";
import Checkbox from "./CheckBox";
import { prix } from "./PrixFix";
import RadioBox from "./RadioBox";

const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6); //limiter 6 produit a chaque request
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    

    const ChargerResultatFiltres = (nouveauFiltres) => {
        getProduitsFiltrer(skip, limit, nouveauFiltres).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0); 
            }
        })
       
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
               <div className="row d-flex justify-content-center mt-100">
                <div className="col-4 mr-">

              
                
                <div class="card ">
	             <div class="card-body text-left">
	             <h4 class="card-title">Filtrer par categorie</h4>
                 {/* <hr class="mb-30"/> */}

                 <Checkbox categories={categories} handleFilters={filters =>handleFilters(filters, "category")}/>
                 <h4 class="card-title">Filtrer par prix</h4>
                 <RadioBox prices={prix} handleFilters={filters =>handleFilters(filters, "price")}/>
                 </div>
                 </div>
               
                 </div>

                <div className="col-4">{JSON.stringify(filteredResults)}</div>
                </div>
                   
            </Layout>
    );
};

export default Shop;