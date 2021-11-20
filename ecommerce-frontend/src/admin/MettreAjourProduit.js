import React, { useEffect, useState } from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import {updateProduit, getCategories,getSingleProduits} from "./AdminApi";
import '../CSS/categories_products.css';
import { Redirect } from "react-router";

const MettreAjourProduit = ({ match }) => {
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
        error: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const [categories, setCategories] = useState([]);

    const { user, token } = estAuthentifier();
    const {
        name,
        description,
        price,
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
     * Méthode qui permets de charger le produit désiré.
     * @param {*} productId 
     */
   // Load le produit desiree
    const init = productId => {
        getSingleProduits(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // Rempli le state
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                // Charge les categories
                initCategories();
            }
        });
    };

    /**
     * Méthode qui permets de charger tout les catégries
     * et assigne des valeurs aux variables du state.
     */
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };
    
    /**
     * Méthode useEffect qui va charger le produit lorsque la page
     * a complètement chargé pour l'utilisateur.
     */

    useEffect(() => {
        init(match.params.productId);
    }, []);

    /**
     * Méthode qui va changer les valeurs des informations des produits
     * lorsque l'utilisateur change la valeur des champs.
     * @param {*} name 
     */

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    /**
     * Méthode qui va mettre à jour le produit
     * à partir de l'API.
     * @param {*} event 
     */
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateProduit(match.params.productId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <div className="form-group">
            <label className="text-dark">Image</label>
            <br></br>
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-dark">Nom</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-dark">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-dark">Prix</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-dark">Catégorie</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Selectionner</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-dark">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Selectionner</option>
                    <option value="0">Non</option>
                    <option value="1">Oui</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-dark">Quantité</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Modifier le produit</button>
        </form>
    );
    
    /**
     * Méthode qui affiche une erreur lorsque la création du produit n'est pas possible.
     */
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );
    
    /**
     * Méthode qui va afficher un message de succès après qu'un produit a été modifié.
     */
    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Chargement...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/products" />;
            }
        }
    };

    return (
        <Layout title="Modifier un produit" description={`Salut ${user.name}, prêt à modifier un produit ?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    );
};

export default MettreAjourProduit;