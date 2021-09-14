import React from "react";
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Login from './usagers/Login';
import Signup from './usagers/Signup';
import Home from './site/Home';
const Routes = () => {
    return(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path= "/login" exact component = {Login}/>
            <Route path= "/signup" exact component = {Signup}/>
        </Switch>
    </BrowserRouter>
    );
};

export default Routes;