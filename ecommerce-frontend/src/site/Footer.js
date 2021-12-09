import React from 'react';
import '../CSS/Footer.css'

const Footer = ()=>{
    return (
        
         
        <div className="main-footer mt-5">
            <div className="container">
                <div className="row">
                <div className="col">
                <h4 className="h4Footer"> Pour nous contacter</h4>
                    <ul className="list-unstyled">
                        <li className="liFooter"> (514)-535-4392</li>
                        <li className="liFooter">LeGadgetsFactorie@compagnie.com</li>
                 
                    </ul>
                    </div>
                <div className="col">
                <h4 className="h4Footer"> Localisation</h4>
                <ul className="list-unstyled">
                <li className="liFooter"> H4N 1L4</li>
                <li className="liFooter"> Montreal, Quebec  </li>
                <li className="liFooter">10555 Ave de Bois-de-Boulogne</li>
                    </ul>
                </div>
                <div className="col">
                <h4 className="h4Footer"> Membres</h4>
                <ul className="list-unstyled">
                <li className="liFooter">Viktorya Mkrtchyan</li>
                <li className="liFooter">Reda Karamat</li>
                <li className="liFooter"> Mohamed Chemmi</li>
                <li className="liFooter">Mohamed Ashraf Mowafy</li>
                <li className="liFooter">Hamza Belmouh</li>
                    </ul>
                </div>
                <div className="row">
                <p className="col-sm">
                    <hr/>
                    &copy;{new Date().getFullYear()} Le Gadget's Factorie INC | Tout droits reservé

                </p>
                </div>
                </div>

            </div>
           
        </div>
     
       
    )
}
 
export default Footer;