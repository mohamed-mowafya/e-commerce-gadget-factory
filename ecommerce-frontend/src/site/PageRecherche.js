import Card from "./Card";
import { useLocation } from "react-router-dom";
import '../CSS/navbar.css';
import Layout from "./Layout";
const PageRecherche = (props) =>{
   const location = useLocation();
   const params = location.state.params;
   const results = params.results;
    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                </h2>
                <div className="row">
                    {results.map((product, i) => (
                        <Card key={i} product={product} />
                    ))}
                </div>
            </div>
        );
    };
    /** 
    const searchMessage = (searched, results) => {
        if(searched && results.length > 0){
            return `${results.length} Produits trouver`
        }
        if(searched && results.length < 1){
            return `Pas de produit trouver`
        }
    }
    */
return(
    <Layout>
    <div className="container-fluid mt-2">
    {searchedProducts(results)}
    </div>
    </Layout>
);
}
export default PageRecherche;