import React, { useEffect, useState } from "react";
import { getCategories } from "./apiSite";
import Card from "./Card";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        categorie: '',
        recherche: '',
        resultat: [],
        dejaRecherhe: false
    });

    const { categories, categorie, recherche, resultat, dejaRecherhe } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setData({ ...data, categories: data })
            }
        });
    };

    useEffect(() => {
        loadCategories()
    }, []);

    const searchSubmit = () => {

    }

    const handleChange = () => {

    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("categorie")}>
                            <option value="All"> Choisir la catégorie</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Rechercher par le nom du produit"
                    />
                </div>
                <div className="btn input-group-append" style={{border: "none"}}>
                    <button className="input-group-text">Rechercher</button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container mb-3">{searchForm()}</div>
        </div>
    );
};

export default Search;