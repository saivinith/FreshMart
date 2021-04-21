import axios from 'axios'
import React, { Component } from 'react'
import Productitem from './Productitem'
//import Carousel from "react-elastic-carousel";
class Home extends Component{
    state = {
        name:'',
        price:'',
        stock:'',
        shortDesc:'',
        description:'',
        selectedFile:null,
        prod : [],
        // items: [
        //     {id: 1, title: 'item #1'},
        //     {id: 2, title: 'item #2'},
        //     {id: 3, title: 'item #3'},
        //     {id: 4, title: 'item #4'},
        //     {id: 5, title: 'item #5'}
        //   ]
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
                    <Productitem name={key.name} price = {key.price} stock = {key.Quantity} shortdesc = {key.shortDesc} Desc={key.description} file={key.file}/>
                    {/* <h2>{key.name}</h2>
                    <p>{key.price}</p>
                    <p>{key.Quantity}</p> */}
                </div>
        
        ));
    };

    render(){
        //const { items } = this.state.items;
        return(
            <>
            {/* <Carousel>
            {items.map(item => <div key={item.id}>{item.title}</div>)}
            </Carousel> */}
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