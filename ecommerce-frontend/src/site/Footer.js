import React from 'react';
import '../CSS/Footer.css'

const Footer = ()=>{
    return (
        
         
        <footer class="text-center text-lg-start text-white">
            <div className="container p-4 pb-0 footerMargin">
                <div className="row">
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold h4Footer"> Pour nous contacter</h6>
                    <ul className="list-unstyled">
                        <li className="liFooter "> (514)-535-4392</li>
                        <li className="liFooter">LeGadgetsFactorie@compagnie.com</li>
                 
                    </ul>
                    </div>
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold h4Footer"> Localisation</h6>
                <ul className="list-unstyled">
                <li className="liFooter"> H4N 1L4</li>
                <li className="liFooter"> Montreal, Quebec  </li>
                <li className="liFooter">10555 Ave de Bois-de-Boulogne</li>
                    </ul>
                </div>
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold h4Footer"> Membres</h6>
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
                    <hr />
                    &copy;{new Date().getFullYear()} Le Gadget's Factorie INC | Tout droits reservé

                </p>
                </div>
                </div>

            </div>
           
        </footer>
     
       
    )
}
 
export default Footer;