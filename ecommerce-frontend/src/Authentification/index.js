import {API} from "../config"
export const signupAPI = user =>{
    return fetch(`${API}/signup`,{
        mode:"cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    
    .then(reponse => reponse.json())
    .catch(err =>{
        console.log(err)
    });
};
export const loginAPI = user =>{
    return fetch(`${API}/signin`,{
        mode:"cors",
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    
    .then(reponse => reponse.json())
    .catch(err =>{
        console.log(err)
    });
};
export const authentifier = (data,cb) =>{
    if(typeof window !='undefined'){
        localStorage.setItem('jwt', JSON.stringify(data))
        cb()
    }
}
//Permet de vérifier si l'utilisateur est authentifié
export const estAuthentifier = () => {
    if(typeof window =='undefined'){
        return false;
    }if (localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }

    }