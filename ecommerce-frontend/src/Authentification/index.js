
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