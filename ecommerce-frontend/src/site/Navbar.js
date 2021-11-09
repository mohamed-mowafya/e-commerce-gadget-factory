import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { estAuthentifier } from "../Authentification";
import { signout } from "../Authentification";
import '../CSS/navbar.css'
import logo from '../images/logo.png'; 
import { itemAuTotal } from "./panierHelper";
import cartImage from '../images/shopping-cart2.png'; //https://lordicon.com/icons
import Search from "./Search";

const pageActive = (history, path) => {
  // History = page actuel
  if (history.location.pathname === path) {
    return { color: '#b4d8ee' };
  }
  else {
    return { color: '#FFFFFF' };
  }
}
const NavBar = ({ history }) => (
  <div className="nav_background">
    <nav className="navbar navbar-expand-lg navbar-modifier">
    
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse d-flex" id="navbarNavAltMarkup">
        <div className="flex-style">
          <a className="navbar-brand flex-logo" href="/">
            <img src={logo}  />
          </a> 
          <div className="flex-search mt-3">
          <Search/>
          </div>
          <div className="flex-panier">
          {!estAuthentifier() && (
            <Link className="nav-item nav-link logos" style={pageActive(history, '/login')} to="/login"><i class="far fa-user logo-usager"></i></Link>          
          )}

          <Link className="nav-item nav-link panier-logo logos" style={pageActive(history, '/cart')} to="/cart"> <img src={cartImage} width="35"/> <sup><small className="cart-badge">{itemAuTotal()}</small></sup></Link>
          </div>
        </div>

        <div className="flex-style-2">
        <Link className="nav-item nav-link" style={pageActive(history, '/')} to="/">Accueil</Link>

      <Link className="nav-item nav-link" style={pageActive(history, '/shop')} to="/shop">Produits</Link>

        {estAuthentifier() && estAuthentifier().user.role == 0 &&(
       <Link className="nav-item nav-link" style={pageActive(history, '/usager/dashboard')} to="/usager/dashboard">Dashboard</Link>
      )}
        {estAuthentifier() && estAuthentifier().user.role == 1 &&(
        <Link className="nav-item nav-link" style={pageActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
        )}
                    {estAuthentifier() && (
          <Link className="nav-item nav-link" style={{cursor: 'pointer', color: '#ffffff'}} onClick={() => signout(() => {history.push("/");})} to="/">Déconnexion</Link>
            )}
          

        </div>
      </div>
    </nav>
  </div>

)
export default withRouter(NavBar);