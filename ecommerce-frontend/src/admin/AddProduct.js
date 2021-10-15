import React, { useEffect, useState } from "react";
import Layout from "../site/Layout";
import { estAuthentifier } from "../Authentification";
import { Link } from "react-router-dom";
import { createCategory, createProduct } from "./AdminApi";
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
        formData:''
    })

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
    } = values

    useEffect(() =>{
        setValues({...values,formData:new FormData})
    },[])
    const changementValeur = name => event =>{
        const value = name  === 'photo' ? event.target.files[0]:
        event.target.value
        formData.set(name,value)
        setValues({...values,[name]: value})
    }

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
                    <option value="609b5864457aa35a94624993">Papier et tablettes</option>
                    <option value="609b5864457aa35a94624993">test</option>
                </select>

            </div>
            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={changementValeur('shipping')} className="form-control">
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
    return(
        <Layout>
        <div className="row">
            <div className="col-md-8 offset-md-2">{newPostForm()}</div>
        </div> 
        </Layout>
    )
}
export default AddProduct