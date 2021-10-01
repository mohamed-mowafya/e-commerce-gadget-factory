import React, {component} from "react";
import { Route, Redirect } from "react-router-dom";
import { estAuthentifier } from "./index";


const RouteAdministarteur = ({ component: Component, ...rest }) => (
    //On retourne le route après avoir verifié l'authentification et avoir verifié si c'est un administrateur
    //Si ça passe , le component est retourné ,  si non, il est redirigé à la page de connexion
    <Route    
        {...rest}
        render={props =>
            estAuthentifier() && estAuthentifier.usager.role ===1 ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);


export default RouteAdministarteur;