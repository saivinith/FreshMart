import axios from 'axios'
import React, { Component } from 'react'
import Cartitem from './Cartitem'
import './home.css'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Panel} from 'rsuite';
import CurrencyFormat from 'react-currency-format'
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Grid from '@material-ui/core/Grid';
class Favorite extends Component{
    state = {
        name: "",
        email: "",
        address: "",
        prod : [],
        order:{},
        subtotal : 0,
        itemCount:0,
        receipt:false,
        showCheckout:false
    }
    componentDidMount() {
        this.getProducts();
    }
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };
    createOrder = (e) => {
        localStorage.setItem('cartItems',0)
        console.log(this.state.prod);
        axios.post('http://127.0.0.1:5000/history',{          
                fav:this.state.prod,
                userId:localStorage.getItem('userId')
        }).then((res)=>{
                console.log(res.data.code);
                if(res.data.code===200){
                    this.setState({receipt:true})
                    setTimeout(5000);
                }

                if(res.data.code!==200){
                    toast.error("Something went wrong:"+res.data.error+"",{position:toast.POSITION.TOP_CENTER,autoClose:5000})
                }
               
        })
    };  
    getProducts = () =>{
        //console.log(localStorage.getItem('userId'));
        axios.post('http://127.0.0.1:5000/favorites',{
            userId:localStorage.getItem('userId')
        })
        .then((res)=>{
            const products = res.data
            this.setState({prod:products})
            var stotal = 0;
            var numItems = 0;
            products.forEach((key,index) => {
               stotal += (key.quantity*key.price) 
               numItems+=(key.quantity)
                });
           this.setState({subtotal:stotal})
           this.setState({itemCount:numItems})
           //console.log(numItems)
        })
        .catch(()=>{
            console.log('error home')
        })
    }

    
    displayProducts = (items) =>{
        if(!items.length) return null;
        return items.map((key,index) => (
                <div key={index} className="grid-element">
                    <Cartitem id={key._id} cardId={key.cardId} name={key.name} price = {key.price} stock = {key.stock} shortdesc = {key.shortDesc} Desc={key.description} 
                    file={key.file} category={key.category} quantity={key.quantity}/>
                </div>
        ));
    };
     useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 200,
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
      }));
      classes = this.useStyles;

    render(){

        return(
            <>
                <div>
                    {this.state.itemCount === 0 ? (
                        <div className="cart cart-header"><h1>Cart is empty</h1></div>
                        ) : (
                        <div className="cart cart-header">
                            <h1>You have {this.state.itemCount} item in the cart{" "}</h1>
                        </div>
                    )}
                </div>
                {this.state.receipt && (
                                <Modal isOpen={true}  onRequestClose={()=>{
                                    this.setState({receipt:false})
                                }}>
                                    <Zoom>
                                    <button className="close-modal" onClick={()=>{
                                    this.setState({receipt:false})
                                }}>
                                        x
                                    </button>
                                    <div className="order-details">
                                        <h3 className="success-message">Your order has been placed.</h3>
                                        <h2>Order</h2>
                                        <ul>
                                        <li>
                                            <div>Name:</div>
                                            <div>{this.state.name}</div>
                                        </li>
                                        <li>
                                            <div>Email:</div>
                                            <div>{this.state.email}</div>
                                        </li>
                                        <li>
                                            <div>Address:</div>
                                            <div>{this.state.address}</div>
                                        </li>
                                        <li>
                                            <div>Date:</div>
                                            <div>{"04/22/2021"}</div>
                                        </li>
                                        <li>
                                            <div>Total:</div>
                                            <div><CurrencyFormat value={this.state.subtotal} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                                        </li>
                                        <li>
                                            <div>Cart Items:</div>
                                            <div>
                                            {this.state.prod.map((x) => (
                                                <div>
                                                {x.quantity} {" x "} {x.name}
                                                </div>
                                            ))}
                                            </div>
                                        </li>
                                        </ul>
                                    </div>
                                    </Zoom>
                                </Modal>
                    )}
                <div className="content">
                    <div className="main">
                    <Grid container spacing ={3} className="grid">
                        {this.displayProducts(this.state.prod)}
                    </Grid>
                    </div>
                    <div className="sidebar">
                        {/* <div className="cart"> */}
                                
                                {this.state.itemCount!==0 &&(
                                    <div>
                                        <Panel header="" bordered className="card">
                                            <Paper className={this.classes.paper}><h2>Total:</h2><CurrencyFormat value={this.state.subtotal} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Paper>
                                            <button
                                                onClick={() => {
                                                this.setState({ showCheckout: true });
                                                }}
                                                className="button primary"
                                            >
                                                Proceed
                                            </button>
                                        </Panel>
                                        {this.state.showCheckout && (
                                            <Fade right cascade>
                                            <div className="cart">
                                                <div><h3>Enter Details:</h3></div>
                                                
                                                <form onSubmit={this.createOrder}>
                                                <ul className="form-container">
                                                    <li>
                                                    <label>Email</label>
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        required
                                                        onChange={this.handleInput}
                                                    ></input>
                                                    </li>
                                                    <li>
                                                    <label>Name</label>
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        required
                                                        onChange={this.handleInput}
                                                    ></input>
                                                    </li>
                                                    <li>
                                                    <label>Address</label>
                                                    <input
                                                        name="address"
                                                        type="text"
                                                        required
                                                        onChange={this.handleInput}
                                                    ></input>
                                                    </li>
                                                    <li>
                                                    <button className="button primary" >
                                                        Checkout
                                                    </button>
                                                    </li>
                                                </ul>
                                                </form>
                                            </div>
                                            </Fade>
                                        )}
                                    </div>
                                )}  
                            {/* </div>    */}
                    </div>
                    </div>
        
            </>
            
                
                
          
        )
    }
}
export default Favorite;