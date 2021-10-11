import React from "react";
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Login from './usagers/Login';
import Signup from './usagers/Signup';
import Home from './site/Home';
import Shop from './site/Shop';
import RoutePrive from "./Authentification/RoutesPrive";
import DashboardUtilisateur from "./usagers/DashboardUtilisateur";
import DashboardAdministrateur from "./usagers/DashboardAdministrateur";
import RouteAdministarteur from "./Authentification/RouteAdministrateur";
import AddCategory from "./admin/AddCategory";


const Routes = () => {
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path= "/shop" exact component = {Shop}/>
            <Route path= "/login" exact component = {Login}/>
            <Route path= "/signup" exact component = {Signup}/>
            <RoutePrive path ="/usager/dashboard" exact component={DashboardUtilisateur}></RoutePrive>
            <RouteAdministarteur path ="/admin/dashboard" exact component={DashboardAdministrateur}></RouteAdministarteur>
            <RouteAdministarteur path ="/creer/categorie" exact component={AddCategory}></RouteAdministarteur>
        </Switch>
    </BrowserRouter>
    );
};

export default Routes;