import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { estAuthentifier } from "../Authentification";
import { signout } from "../Authentification";
import '../CSS/navbar.css'
import logo from '../images/logo.png'; 
import { itemAuTotal } from "./panierHelper";
import cartImage from '../images/shopping-cart2.png'; //https://lordicon.com/icons
import Search from "./Search";

/**
 * Méthode qui permets de changer la couleur
 * du lien de navigation actuel pour que 
 * l'utilisateur puisse savoir sur quel
 * page il est.
 * @param {*} history 
 * Variable history qui prendre en paramètre le lien de navigation.
 * @param {*} path 
 * Variable path qui va contenir la page actuel et qui va 
 * servir à comparer si le lien de navigation correspond 
 * à la page actuel.
 * @returns Une couleur blanche est retourné si le lien de navigation
 * n'est pas la page actuel, sinon une couleure bleue est retournée.
 */
const pageActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#b4d8ee' };
  }
  else {
    return { color: '#FFFFFF' };
  }
}
const NavBar = ({ history }) => (
  
<nav className="navbar navbar-expand-lg navbar-dark nav_background">
  <div className="container-fluid">
    <a className="navbar-brand" href="/"><img src={logo}  /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="barre-recherche">
        <Search/>
        </div>
        <div className="navbar-nav ms-auto">
        <Link className="nav-link" style={pageActive(history, '/')} to="/">Accueil</Link>
        <Link className="nav-link" style={pageActive(history, '/shop')} to="/shop">Produits</Link>
        {!estAuthentifier() && (
            <Link className="nav-link" style={pageActive(history, '/login')} to="/login"><i class="far fa-user logo-usager"></i></Link>          
          )}
        {estAuthentifier() && estAuthentifier().user.role == 0 &&(
       <Link className="nav-link" style={pageActive(history, '/usager/dashboard')} to="/usager/dashboard">Dashboard</Link>
      )}
        {estAuthentifier() && estAuthentifier().user.role == 1 &&(
        <Link className="nav-link" style={pageActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
        )}
        <Link className="nav-link" style={pageActive(history, '/cart')} to="/cart"> <i class="fas fa-shopping-cart"></i><sup><small className="cart-badge">{itemAuTotal()}</small></sup></Link>
                    {estAuthentifier() && (
          <Link className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}} onClick={() => signout(() => {history.push("/");})} to="/">Déconnexion</Link>
            )}
        </div>
        </div>
      </div>
</nav>
)
export default withRouter(NavBar);