import React, { useEffect, useState } from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import { createCategory, createProduct, getCategories } from "./AdminApi";
import '../CSS/categories_products.css';




const AddProduct = () => {
    const { user, token } = estAuthentifier()
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;


    /**
     * Méthode qui permets de charger les catégories
     * à partir du backend.
     */
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };


    /**
     * Méthode useEffect qui permets de charger la catégorie
     * dès que la page charge complètement pour l'usager.
     */
    useEffect(() => {
        init()
    }, [])

    /**
     * Méthode qui permets de changer les valeurs du state de la page (setValues)
     * et qui permets de changer la valeur des élements du form (formData.set())
     * @param {*} name 
     * Variable name contient l'élement qui a été changé.
     */
    const changementValeur = name => event => {
        const value = name === 'photo' ? event.target.files[0] :
            event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    }

    /**
     * Méthode qui envoie les valeurs du formData à
     * l'API du bakcend afin de créer un produit.
     * @param {*} event 
     */
    const submitValeurs = (event) => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                }
                else {
                    setValues({ ...values, name: '', description: '', photo: '', price: '', quantity: '', loading: false, createdProduct: data.name });
                }
            })
    }
    /**
     * Méthode qui contient le form (html) et qui va servir à
     * l'affichage. 
     */
    const newPostForm = () => (
        <div className="form-produit mt-4 mb-2">
        <h3 className="d-flex justify-content-center font-oswald form-margin header-produit">Créer un produit</h3>
       
        <form onSubmit={submitValeurs}>
            <div className="d-flex column justify-content-center">
            <div className="form-group mb-4 d-flex row justify-content-center me-4">
                <label className="text-muted font-oswald">Nom</label>
                <input type="text" onChange={changementValeur('name')} className="form-control mb-3" value={name}></input>

                <label className="text-muted font-oswald">Description</label>
                <textarea type="text" onChange={changementValeur('description')} className="form-control mb-3"
                    value={description}></textarea>

                <label className="text-muted font-oswald">Prix</label>
                <input type="number" onChange={changementValeur('price')} className="form-control" value={price}></input>


            </div>
            <div className="form-group mb-3 d-flex row justify-content-center ms-4">
            <label className="text-muted font-oswald">Catégorie</label>
                <select onChange={changementValeur('category')} className="form-control mb-4 mt-1">
                    <option>Choisissez</option>
                    {categories && categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                </select>
                <label className="text-muted font-oswald" id="m-livr">Livraison</label>
                <select onChange={changementValeur('shipping')} className="form-control mb-5">
                    <option>Choisissez</option>
                    <option value="0">Yes</option>
                    <option value="0">No</option>
                </select>
                <label className="text-muted font-oswald">Quantité</label>
                <input type="number" onChange={changementValeur('quantity')} className="form-control" id= "m-quant" value={quantity}></input>
            </div>

           
            </div>
            <div className="form-group">
                <input onChange={changementValeur('photo')} type="file" name="photo" accept="image/*" />
            </div>
            <div className="d-flex justify-content-center btn-margin">
                <button className="btn btn-secondary d-flex justify-content-center btn-md w-50">Créer</button>
            </div>
        </form>
        </div>
    )
    /**
     * Méthode qui va afficher une erreur si la création du produit
     * n'est pas possible
     */
    const afficherErreur = () => (
        //afficher message d'erreur
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );
    /**
     * Méthode qui va afficher un message du succès après la création
     * d'un produit.
     */
    const afficherSucces = () => (
        //afficher message de succes
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} est crée!</h2>
        </div>
    );
    /**
     * Méthode qui va afficher un message de chargement après la création d'un produit.
     */
    const afficherChargement = () =>
        // montre message de chargeemnt au moement de la creation d'un produit
        loading && (
            <div className="alert alert-success">
                <h2>Chargement...</h2>
            </div>
        );



    return (
        <Layout>
                <div className="col-md-8 offset-md-2">
                    {newPostForm()}</div>
        
        </Layout>
    )
}
export default AddProduct