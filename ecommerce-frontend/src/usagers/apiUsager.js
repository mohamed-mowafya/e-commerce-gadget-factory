import { API } from "../config";


export const read = (userID,token) => {
   
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    })
         .then(response => {
             return response.json();
         })
         .catch(err => console.log(err));
};

export const update = (userID,token,user) =>{
    return fetch(`${API}/user/${userID}`,{
        method: "PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        return response.json();
    })
    .catch(err =>{
        console.log(err)
    })
}

export const updateUser = (user,cb) =>{
    if(typeof window !=='undefined'){
        if(localStorage.getItem('jwt')){
            let auth = localStorage.getItem(jwt)
            auth.user = user
            localStorage.setItem('jwt',JSON.stringify(auth))
            cb()
        }
    }
}
