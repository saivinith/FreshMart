import axios from 'axios'
import React, { Component } from 'react'
class Home extends Component{
    state = {
        name:'',
        price:'',
        stock:'',
        shortDesc:'',
        description:'',
        selectedFile:null,
        prod : []
    }
    componentDidMount() {
        this.getProducts();
    }
    getProducts = () =>{
        axios.get('/fetchProducts')
        .then((res)=>{
            const products = res.data
            this.setState({prod:products})
            console.log(products)
        })
        .catch(()=>{
            console.log('error home')
        })
    }
    displayProducts = (items) =>{
       
        if(!items.length) return null;
        console.log('sdfsd');
        return items.map((key,index) => (
            
                <div key={index}>
                    <h2>{key.name}</h2>
                    <p>{key.price}</p>
                    <p>{key.Quantity}</p>
                </div>
        
        ));
    };
    render(){
        return(
            <>
            <h1>Welcome HOME!!!</h1> 
            <div className='Pitems'>
                {/* alert('er'); */}
                {this.displayProducts(this.state.prod)}
            </div>
            </>    
        )
    }
}
export default Home;