import React from "react";
import { API } from "../config";

// l'objet peux etre soit une image oit un url
const ShowImage = ({ item, url }) => (
    <div className="product-img">
        <img
            src={`${API}/${url}/photo/:${item._id}`} alt={item.name} className="mb-3 card-img-top"style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
    </div>
);

export default ShowImage;
