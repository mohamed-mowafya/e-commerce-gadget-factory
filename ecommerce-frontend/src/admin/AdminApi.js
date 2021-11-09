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


 /**
  * Permet d'aller chercher les categories du backend
  * @returns response.json()
  */
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET"
    })
         .then(response => {
             return response.json();
         })
         .catch(err => console.log(err));
}

/**
 * Permets de chercher tout les commandes
 *  à partir du backend.
 * @returns response.json()
 */
export const getCommandes = (userId,token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
        
    })
         .then(response => {
             return response.json();
         })
         .catch(err => console.log(err));
}

/***
 * Permets de chercher les états d'une commande à partir de la BD.
 */
export const getValeursEtat = (userId,token) => {
    return fetch(`${API}/order/valeurs-etat/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        }
        
    })
         .then(response => {
             return response.json();
         })
         .catch(err => console.log(err));
}

/***
 * Permets de chercher les états d'une commande à partir de la BD.
 */
 export const updateEtatCommande = (userId,token,commandeId,statut) => {
    return fetch(`${API}/order/${commandeId}/etat/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({statut,commandeId})
        
    })
         .then(response => {
             return response.json();
         })
         .catch(err => console.log(err));
}