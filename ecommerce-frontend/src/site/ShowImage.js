import React from "react";
import { API } from "../config";

// l'objet peux etre soit une image oit un url
const ShowImage = ({ item, url }) => (
   
        <img 
           src={`${API}/${url}/photo/${item._id}`} className="img-fluid" style={{ height: "350", maxWidth: "96" }} alt={item.name}
        /> 

);

export default ShowImage;
