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
