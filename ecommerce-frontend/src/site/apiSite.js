import { API } from "../config";


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