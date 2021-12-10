import React, { component } from "react";
import { Route, Redirect } from "react-router-dom";
import { estAuthentifier } from "./index";

/**
 * Méthode qui retourne la route si l'utilisateur est authentifié, s'il 
 * est authentifié, le component est retourné, sinon, il est redirigé vers la page de connexion.
 * (Évite que des utilisateurs non authentifiés accèdent à des routes protégés.)
 * @param {*} param0 
 */
const RoutePrive = ({ component: Component, ...rest }) => (
    /**
    *On retourne le route après avoir verifié l'authentification et que ca soit un usager regulier
    *Si ça passe , le component est retourné ,  si non, il est redirigé à la page de connexion
    */
    <Route
        {...rest}
        render={props =>
            estAuthentifier() && estAuthentifier().user.role === 0 ? (
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


export default RoutePrive;