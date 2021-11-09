export const ajoutItem = (item, next) => {
    let cart = []
    if(typeof window !== 'undefined'){
        //Prend les item du local storage avec le nom cart
        if (localStorage.getItem('cart')){ 
            cart = JSON.parse(localStorage.getItem('cart')) // Popule les items dans cart[]
        }
        cart.push({
            ...item,
            count : 1 // incemente de le count
        })
        // evite de dupliquer le meme produit dans le cart
        //le set enleve automatiquement la duplication
        cart = Array.from(new Set(cart.map((p) => (p._id)))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();// -> execute la fonction
    }
};

// determine le nombre total de produit dans le panier
export const itemAuTotal = () =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
}
// Get le panier du localStorage 
export const getPanier = () =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
}

// permet de changer la quantite de chaque item dans le panier
export const MisAjourItem = (IDproduit, count) => {
    let cart=[]
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) =>{
            if(product._id === IDproduit ){
                cart[i].count = count
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}


// Permet de supprimer un article dans le panier
export const supprimerProduit = (IDproduit) => {
    let cart=[]
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((product, i) =>{
            if(product._id === IDproduit){
                cart.splice(i, 1) // enleve un 
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};


export const viderPanier = next => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('cart');
        next();
    }
}