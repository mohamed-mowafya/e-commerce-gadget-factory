import {API} from "../config";

export const createCategory = (userId,token,category) =>{
    return fetch(`${API}/category/create/${userId}`,{
        mode:"cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    
    .then(reponse => reponse.json())
    .catch(err =>{
        console.log(err)
    });
};

export const createProduct = (userId,token,product) =>{
    return fetch(`${API}/product/create/${userId}`,{
        mode:"cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    
    .then(reponse => reponse.json())
    .catch(err =>{
        console.log(err)
    });
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