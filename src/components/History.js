import React, { Component } from 'react'
import axios from 'axios'
import Productitem from './Productitem'
import './home.css'
import Grid from '@material-ui/core/Grid';
export default class Purchases extends Component{

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
        axios.post('http://127.0.0.1:5000/fetchHistory',{          
                userId:localStorage.getItem('userId')
        }).then((res)=>{
                const products = res.data
                this.setState({prod:products})
                
        }).catch(()=>{
            console.log('error home')
        })
        
    }
    
    displayProducts = (items) =>{
        if(!items.length) return null;
        console.log(items)
        return items.map((value,index) => (
            <Grid container direction="row" key={index}>
            <p>{value[0]}</p>          
            {
            value[1].map((key,index) => (
                <div key={index}  className="grid-element" >
                <Productitem id={key._id} name={key.name} price = {key.price} stock = {key.quantity} shortdesc = {key.shortDesc} Desc={key.description} 
                file={key.file} category={key.category}/>
                </div>
                ))
                
            }
            {/* </div> */}
             </Grid>
        ))  
    };

    render(){
        //const { items } = this.state.items;
        return(
            <div>
                    <div className="content">
                    <div className="main">
                    <Grid container direction="row"spacing ={3} className="grid">
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
