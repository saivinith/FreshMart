import axios from 'axios'
import React, { Component } from 'react'
import Productitem from './Productitem'
import './home.css'
//import {Container,Row,Col} from 'react-bootstrap'
//import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@material-ui/core/Grid';

class Home extends Component{
    state = {
        id:'',
        name:'',
        price:'',
        stock:'',
        shortDesc:'',
        description:'',
        selectedFile:null,
        prod : [],
    }
    componentDidMount() {
        this.getProducts();
    }
    getProducts = () =>{
        axios.get('/fetchProducts')
        .then((res)=>{
            const products = res.data
            this.setState({prod:products})
            //console.log(products)
        })
        .catch(()=>{
            console.log('error home')
        })
    }
    
    displayProducts = (items) =>{
        if(!items.length) return null;

        return items.map((key,index) => (
              
            <div  key={index} className="grid-element">
                    <Productitem id={key._id} name={key.name} price = {key.price} stock = {key.stock} shortdesc = {key.shortDesc} Desc={key.description} 
                    file={key.file} category={key.category}/>

            </div>
            ))  
    };

    render(){
        //const { items } = this.state.items;
        return(
            <div>
                    <div className="content">
                    <div className="main">
                        <Grid container spacing ={3} className="grid">
                            {this.displayProducts(this.state.prod)}
                        </Grid>
                    </div>
                    <div className="sidebar">
                        
                    </div>
                    </div>
            </div>        
 

        )
    }
}
export default Home;