import React, { useEffect, useState } from "react";
import { getCategories, list } from "./apiSite";
import Card from "./Card";
import { useHistory } from 'react-router-dom'
import { Link, withRouter } from 'react-router-dom';
import '../CSS/navbar.css';
import PageRecherche from "./PageRecherche";
const Search = (props) => {
    let history = useHistory(); 
    const [data, setData] = useState({
        search: '',
        results: [],
        searched: false
    });

    const {search, results, searched } = data;
    const searchData = () => {
        if (search) {
            list({ search: search})
            .then (response => {
                if (response.error) {
                    console.log(response.error)
                } else {
                    setData({ ...data, results: response, searched: true });
                    console.log("wtfff",results.length);
                }
            })

        }
    };

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
        if(results.length>0){
            handleRecherche();
        }
       
    };

    const handleChange = (name) => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const handleRecherche = () =>{
        history.push('/recherche',{params:data})
    }


    const searchForm = (history) => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg navbar-search">
                    <input
                        type="search"
                        className="form-control navbar-search input-group-text"
                        onChange={handleChange("search")}
                        placeholder="Rechercher"
                    />
                </div>
                <div className="btn input-group-append" style={{ border: "none" }}>
                    <button className="input-group-text" formaction={searchSubmit}><i class="fas fa-search"></i></button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="search">
            <div className="container mt-3">
                {searchForm()}
            </div>
        </div>
    );
};

export default Search;