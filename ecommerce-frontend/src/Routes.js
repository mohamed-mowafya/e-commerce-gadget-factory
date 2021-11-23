import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './usagers/Login';
import Signup from './usagers/Signup';
import Home from './site/Home';
import Shop from './site/Shop';
import RoutePrive from "./Authentification/RoutesPrive";
import DashboardUtilisateur from "./usagers/DashboardUtilisateur";
import DashboardAdministrateur from "./usagers/DashboardAdministrateur";
import RouteAdministrateur from "./Authentification/RouteAdministrateur";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import profile from "./usagers/Profile";
import Panier from "./site/Panier";
import Product from "./site/Product";
import Commandes from "./admin/Commandes";
import PageRecherche from "./site/PageRecherche"
import ProductDetails from "./site/ProductDetails";
import GestionProduits from "./admin/GestionProduit";
import MettreAjourProduit from "./admin/MettreAjourProduit";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/login" exact component={Login} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/cart" exact component={Panier} />
                <Route path="/recherche" exact component={PageRecherche} />
                <RoutePrive path="/usager/dashboard" exact component={DashboardUtilisateur}></RoutePrive>
                <RouteAdministrateur path="/admin/dashboard" exact component={DashboardAdministrateur}></RouteAdministrateur>
                <RouteAdministrateur path="/creer/categorie" exact component={AddCategory}></RouteAdministrateur>
                <RouteAdministrateur path="/creer/produit" exact component={AddProduct}></RouteAdministrateur>
                <RouteAdministrateur path="/admin/orders" exact component={Commandes}></RouteAdministrateur>
                <RouteAdministrateur path="/admin/products" exact component={GestionProduits}></RouteAdministrateur>
                <RouteAdministrateur path="/admin/product/update/:productId" exact component={MettreAjourProduit}></RouteAdministrateur>
                <RoutePrive path="/profile/:userId" exact component={profile}></RoutePrive>
                <Route path="/product/:productId" exact component={Product}></Route>
                <Route path="/productdetails/:productId" exact component={ProductDetails} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;