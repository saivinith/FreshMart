import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './Productitem.css'
import axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { FlexboxGrid } from 'rsuite';
import CurrencyFormat from 'react-currency-format'
const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
    media: {
      height: 200,
      width: 250
    },
    content:{
      display:FlexboxGrid,
      height: 150
    }
  });

toast.configure()  

function Productitem({id,name,price,stock,shortdesc,Desc,file,category}) {
  var card_detail = {
    id:id,
    name:name,
    stock:stock,
    price:price,
    shortdesc:shortdesc,
    Desc:Desc,
    file:file,
    category:category
}
    const user = localStorage.getItem('user');
    const accesscode = localStorage.getItem('accesscode');
    const classes = useStyles();
    // const  [toggleHeart, setToggleHeart] = useState(false)
    const [openModal ,setOpenModal] = useState(false)
    const filePath = '/images/'+file;

    const addTOC = () =>{
      if(!user)
      {window.location='/login'}
      card_detail.userID = localStorage.getItem('userId');
      console.log(stock);
      axios.post(
          'http://127.0.0.1:5000/addToCart',
          card_detail
        ).then((res)=>{
              //console.log('added');
              if(res.data.code===200){
               // console.log("carted");
                var cid = localStorage.getItem('cartItems');
                localStorage.setItem('cartItems',parseInt(cid)+1)
                //toast.success("Item added",{position:toast.POSITION.TOP_CENTER,autoClose:5000})
                window.location = '/'
              }else{
                toast.error("Error: "+res.data.error+"",{position:toast.POSITION.TOP_CENTER,autoClose:5000})
                console.log(res.data.error);
              }

        })
      }

    const cardEdit = () =>{
          localStorage.setItem('cardItem', JSON.stringify(card_detail));
          window.location = '/add';
      }
    const cardDelete = () =>{
      //e.preventDefault();
      console.log("deleting")
      axios.post('http://127.0.0.1:5000/delete',{          
              id:id
      }).then((res)=>{
          console.log("success");
          window.location = '/';
      })
    }    
    let adminBtn;
    if(user && accesscode > 0){
      
      adminBtn = <>
      <IconButton aria-label="edit" onClick={cardEdit}>
                <EditIcon/>
            </IconButton>
      <IconButton aria-label="delete" onClick={cardDelete}>
                <DeleteIcon />
            </IconButton>
            </>;
    }
    const closeModal = () => {
      setOpenModal(!openModal);
    };
    return (
        <div>
        <div className="card_row">     
        <Card className={`card ${classes.root}`}>
          <CardActionArea onClick={()=>{setOpenModal(!openModal)}}>
            <div className='overflow'>
              <CardMedia
                className={`cardImg ${classes.media}`}
                image={filePath}
                height='180px'
                title="Contemplative Reptile"
              />
            </div>
            <CardContent className={`card_content ${classes.content}`}>
              <Typography gutterBottom variant="h5" component="h2" >
                {name}
              </Typography>
              <Typography gutterBottom variant="h6" component="h2">
                Price: ${price}
              </Typography>
              <Typography gutterBottom variant="inherit" component="h3"  >
                 Available: {stock} 
              </Typography>
              <Typography paragraph variant="inherit" component="h3" >
                {Desc} 
              </Typography>
              {stock<=0 &&(
                <Typography paragraph variant="caption" component="h4" color="secondary" >
                   *Item Not Available 
                </Typography>
              )}
                
            </CardContent>
          </CardActionArea>
          <CardActions>

                <Button size="small" color="primary" onClick={addTOC}>
                Add to cart          
              </Button>  

          {adminBtn}
          </CardActions>
        </Card>
        </div>
        {/* </Fade> */}
        {openModal && (
            <Modal isOpen={true} onRequestClose={closeModal}>
              <Zoom>
                <button className="close-modal" onClick={closeModal}>
                  x
                </button>
                <div className="product-details">
                  <img src={filePath} alt={name}></img>
                  <div className="product-details-description">
                    <p>
                      <strong>{name}</strong>
                    </p>
                    <p>{Desc}</p>
                    <p>
                      Avaiable items:{stock}

                    </p>
                    <div className="product-price">
                      <div><CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                      <button
                        className="button primary"
                        onClick={
                          addTOC
                        }
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </Zoom>
            </Modal>
          )}
        </div>
        
      );
    }

export default Productitem