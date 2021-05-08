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
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {toast} from 'react-toastify';
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
        showCheckout:false,
        error: false,
        errorValue:''
    }
    componentDidMount() {
        this.getProducts();
    }
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      };
      handleSignUp = e =>{
        e.preventDefault();
            var re = /\S+@\S+\.\S+/;
            //this.setState({error:true,errorValue:'*Please enter valid information'})
            if(this.state.email.length===0){
                this.setState({error:true,errorValue:'*Please enter Email'})
            }
            else if(!re.test(this.state.email)){
                this.setState({error:true,errorValue:'*Please enter valid Email: abc@test.com'})
            }
            else if(this.state.name.length===0)
                this.setState({error:true,errorValue:'*Please enter Name'})
            else if(this.state.address.length===0)
                this.setState({error:true,errorValue:'*Please enter address'})
            else{
                this.createOrder();
            }
        }    
    createOrder = (e) => {
        if(this.state.email)
        axios.post('http://127.0.0.1:5000/history',{          
                fav:this.state.prod,
                userId:localStorage.getItem('userId')
        }).then((res)=>{
                
                if(res.data.code===200){
                       this.setState({receipt:true})
                       //window.location.reload(true);
                       
                }

                if(res.data.code!==200){
                    toast.error("Something went wrong:"+res.data.error+"",{position:toast.POSITION.TOP_CENTER,autoClose:5000})
                }
               
        })
        //this.setState({receipt:true})
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
    closeModal 
    
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
            palette:{secondary:  '#f0c14b'},
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 200,
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        Button:{
            backgroundColor:'primary'||'#f0c14b'
        }
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
                                        </Panel>
                                        <Button
                                                variant="contained"
                                                type="submit"
                                                size="large"
                                                color="secondary"
                                                className={`align-items button_cart ${this.classes.Button}`}
                                                onClick={() => {
                                                    this.setState({ showCheckout: true });
                                                    }}
                                                    style={{
                                                        backgroundColor: "#e9b533",
                                                        
                                                    }}    
                                            >
                                                Proceed
                                            </Button>
                                        {this.state.showCheckout && (
                                            <Fade right cascade>
                                                <div><h3>Enter your Details:</h3></div>
                                            <div className="cart">                                                
                                            <div className='AddressBox'>
                                                    <br/>
                                                    {/* <form> */}
                                                        <div className="columns is-mobile is-centered">
                                                        <div className="column is-one-third">
                                                            
                                                            <TextField
                                                                className="align-items"
                                                                type="email"
                                                                name="email"
                                                                //value={this.state.shortDesc}
                                                                onChange={this.handleInput}
                                                                label="email"
                                                                variant="outlined" 
                                                            />
                                                            <TextField
                                                                className="align-items"
                                                                type="name"
                                                                name="name"
                                                                //value={this.state.shortDesc}
                                                                onChange={this.handleInput}
                                                                label="name"
                                                                variant="outlined" 
                                                            />
                                                            <TextField
                                                                className="align-items"
                                                                id="outlined-multiline-static"
                                                                label="Multiline"
                                                                multiline
                                                                rows={4}
                                                                name="address"
                                                                //value={this.state.description}
                                                                onChange={this.handleInput}
                                                                defaultValue=""
                                                                variant="outlined"
                                                            />
                                                            {this.state.error&&(
                                                                <span><p className="error">{this.state.errorValue}</p></span>
                                                            )}
                                                                        {/* {this.state.flash && (
                                                                            <div className={`notification ${this.state.flash.status}`}>
                                                                            {this.state.flash.msg}
                                                                            </div>
                                                                        )} */}

                                                        <Button
                                                                variant="contained"
                                                                type="submit"
                                                                size="large"
                                                                color="secondary"
                                                                className={`align-items button_add`}
                                                                //startIcon={<SaveIcon />}onSubmit={this.createOrder}
                                                                onClick={this.handleSignUp}
                                                                style={{
                                                                    backgroundColor: "#e9b533",
                                                                    
                                                                }}
                                                            >
                                                                Submit
                                                            </Button>
                                                            
                                                        </div>
                                                        </div>
                                                    {/* </form> */}
                                                    </div>
                                                                </div>
                                                                </Fade>
                                                            )}
                                                            
                                                        </div>
                                                    )}  
                            {this.state.receipt && (
                                <Modal isOpen={true}  onRequestClose={()=>{
                                    this.setState({receipt:false})
                                    localStorage.setItem('cartItems',0)
                                    window.location.reload(false);
                                }}>
                                    <Zoom>
                                    <button className="close-modal" onClick={()=>{
                                    this.setState({receipt:false})
                                    localStorage.setItem('cartItems',0)
                                    window.location.reload(false);
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
                                             
                    </div>
                    </div>
        
            </>
            
                
                
          
        )
    }
}
export default Favorite;