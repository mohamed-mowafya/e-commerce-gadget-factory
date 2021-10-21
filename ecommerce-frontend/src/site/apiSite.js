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