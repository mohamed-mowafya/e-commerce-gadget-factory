import { API } from "../config";
import queryString from 'query-string';


export const getProducts = sortBy => {
    // permet de fetch 6 produit en meme temps
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: "GET"
    })
         .then(response => {
             return response.json();
         })
         .catch(err => console.log(err));
};

    // Permet d'aller chercher les categories du backend
export const getCategories = () => {
    return fetch(`${API}/categories`, {
         method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
}

export const list = params => {
    const query = queryString.stringify(params)
    return fetch(`${API}/products/search?${query}`, {
        method: "GET"
    })
         .then(response => {
             return response.json();
         })
         .catch(err => console.log(err));
};