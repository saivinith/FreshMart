import React from 'react'
import './Productitem.css'
//import grocery from '../Assets/images/grocery1.jpg'
function Productitem({name,price,stock,shortdesc,Desc,file}) {
    return(
        <div className="product">
            <div className="product_info">
                <p>{name}</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product_stock">
                    <p>Available:{stock}</p>
                </div>
                <p>{Desc}</p>
                <img src={require('../Assets/images/grocery1.jpg')} alt={name}/>
                <button className="addB">Add to Basket</button>
            </div>
        </div>
    );    

}

export default Productitem