import React from "react";
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Login from './usagers/Login';
import Signup from './usagers/Signup';
import Home from './site/Home';
import RoutePrive from "./Authentification/RoutesPrive";
import Dashboard from "./usagers/DashboardUtilisateur";


const Routes = () => {
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path= "/login" exact component = {Login}/>
            <Route path= "/signup" exact component = {Signup}/>
            <Route path ="/usager/dashboard" exact component={Dashboard}></Route>
        </Switch>
    </BrowserRouter>
    );
};

export default Routes;