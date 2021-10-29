
import React,{useState, useEffect} from "react";
import Card from "./Card";
import Layout from "./Layout";
import { getCategories } from "./apiSite";
import Checkbox from "./CheckBox";
import { prix } from "./PrixFix";
import RadioBox from "./RadioBox";

const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
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
        init();}, 
        []);

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;
        setMyFilters(newFilters)
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

                <div className="col-4">{JSON.stringify(myFilters)}</div>
                </div>
                   
            </Layout>
    );
};

export default Shop;