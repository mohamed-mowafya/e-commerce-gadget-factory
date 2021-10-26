import React, { useEffect, useState } from "react";
import { getCategories, list } from "./apiSite";
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

    const searchData = () => {
        if (recherche) {
            list({ recherche: recherche || undefined, categorie: categorie }).then
            reponse => {
                if (reponse.error) {
                    console.log(reponse.error)
                } else {
                    setData({ ...data, resultat: reponse, dejaRecherhe: true });
                }
            }

        }
    };

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    };

    const handleChange = (nom) => event => {
        setData({ ...data, [nom]: event.target.value, dejaRecherhe: false });
    };

    const searchProducts = (resultat = []) => {
        return (
            <div className="row">
                {resultat.map((product, i) => (
                    <Card key={i} product={product} />
                ))}
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2 mt-2" onChange={handleChange("categorie")}>
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
                <div className="btn input-group-append" style={{ border: "none" }}>
                    <button className="input-group-text">Rechercher</button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container mb-3 mt-4">
                {searchForm()}
            </div>
            <div className="container-fluid mb-3 mt-4">
                {searchProducts(resultat)}
            </div>
        </div>
    );
};

export default Search;