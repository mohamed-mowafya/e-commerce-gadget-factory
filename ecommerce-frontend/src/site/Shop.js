import React,{useState, useEffect} from "react";
import Card from "./Card";
import Layout from "./Layout";
import { getCategories } from "./apiSite";
import Checkbox from "./CheckBox";



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

    const handleFilters = (filters, filterBy) => {
       
        console.log('SHOP',filters, filterBy)
    };

    return (
            <Layout
             title=""
             description=""
             className="container-fluid "
            >
               <div className="row d-flex justify-content-center mt-100">
                <div className="col-4 mr-">

              
                
                <div class="card cardCheckBox">
	            <div class="card-body cardCheckBox-body text-left">
	             <h4 class="card-title">Filtrer par categorie</h4>
                 {/* <hr class="mb-30"/> */}

                 <Checkbox categories={categories} handleFilters={filters =>handleFilters(filters, "category")}/>
              
                 </div>
                 </div>
               
                </div>

                <div className="col-4">sidebar droit</div>
                <div className="col-4">gauche</div>
                </div>
                   
            </Layout>
    );
};

export default Shop;