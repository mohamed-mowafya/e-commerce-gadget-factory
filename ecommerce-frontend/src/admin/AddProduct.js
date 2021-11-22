import React, { useEffect, useState } from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import { createCategory, createProduct, getCategories} from "./AdminApi";
import '../CSS/categories_products.css';




const AddProduct = () =>{
    const {user,token} = estAuthentifier()
    const [values,setValues] = useState({
        name: '',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading: false,
        error: '',
        createdProduct:'',
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
    } = values ;


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
    useEffect(() =>{
       init()
    },[])

    /**
     * Méthode qui permets de changer les valeurs du state de la page (setValues)
     * et qui permets de changer la valeur des élements du form (formData.set())
     * @param {*} name 
     * Variable name contient l'élement qui a été changé.
     */
    const changementValeur = name => event =>{
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
    const submitValeurs = (event) =>{
        event.preventDefault();
        setValues({...values,error:'',loading:true});
        createProduct(user._id,token,formData)
        .then(data =>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,name:'',description:'',photo:'',price:'',quantity:'',loading:false, createdProduct:data.name});
            }
        })
    }
    /**
     * Méthode qui contient le form (html) et qui va servir à
     * l'affichage. 
     */
    const newPostForm = () =>(
        <form className="mb-3" onSubmit={submitValeurs}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <lable className="btn btn-secondary">
                <input onChange={changementValeur('photo')} type="file" name="photo" accept="image/*"/>
                </lable>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={changementValeur('name')} className="form-control" value = {name}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea type="text" onChange={changementValeur('description')} className="form-control" 
                value = {description}></textarea>

            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" onChange={changementValeur('price')} className="form-control" value = {price}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={changementValeur('category')} className="form-control">
                <option>Choisissez</option>
                    {categories && categories.map((c, i ) => (<option key={i} value ={c._id}>{c.name}</option>))}
                </select>

            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={changementValeur('shipping')} className="form-control">
                    <option>Choisissez</option>
                    <option value="0">Yes</option>
                    <option value="0">No</option>
                </select>

            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="number" onChange={changementValeur('quantity')} className="form-control" value = {quantity}></input>
            </div>
            <button className="btn btn-outline-primary">Create Product  </button>
        </form>
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



    return(
        <Layout>
        <div className="row">
            <div className="col-md-8 offset-md-2">
            {afficherErreur()}
            {afficherSucces()}
            {afficherChargement()}
            {newPostForm()}</div>
        </div> 
        </Layout>
    )
}
export default AddProduct