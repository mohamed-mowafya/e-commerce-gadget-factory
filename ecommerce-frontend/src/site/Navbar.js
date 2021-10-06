import React from "react";
import { Link, withRouter } from 'react-router-dom';
import { estAuthentifier } from "../Authentification";
import '../CSS/login_signup.css'
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
      <Link className="navbar-brand" style={pageActive(history, '/')} to="/">Brand</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link" style={pageActive(history, '/')} to="/">Accueil</Link>
          <Link className="nav-item nav-link" style={pageActive(history, '/produits')} to="/">Produits</Link>
          {!estAuthentifier() && (
            <div className="navbar-nav"> 
            <Link className="nav-item nav-link" style={pageActive(history, '/login')} to="/login">Se connecter</Link>
            <Link className="nav-item nav-link" style={pageActive(history, '/signup')} to="/signup">Inscription</Link>
            </div>
          )}
          {estAuthentifier() && estAuthentifier().user.role === 0 &&(
            <Link className="nav-item nav-link" style={pageActive(history, '/usager/dashboard')} to="/usager/dashboard">Dashboard</Link>
          )}
          {estAuthentifier() && estAuthentifier().user.role === 1 &&(
            <Link className="nav-item nav-link" style={pageActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
          )}
        </div>
      </div>
    </nav>
  </div>

)
export default withRouter(NavBar);