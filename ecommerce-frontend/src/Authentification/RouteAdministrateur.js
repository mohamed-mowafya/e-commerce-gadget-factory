import React, {component} from "react";
import { Route, Redirect } from "react-router-dom";
import { estAuthentifier } from "./index";

/**
 * Méthode qui permets de retourner la route à l'utilisateur s'il a un compte
 * administrateur. Si il est administrateur le component est retourné,
 * sinon il est redirigé vers la page de connexion.
 */
const RouteAdministarteur = ({ component: Component, ...rest }) => (
    <Route    
        {...rest}
        render={props =>
            estAuthentifier() && estAuthentifier().user.role == 1 ? (
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