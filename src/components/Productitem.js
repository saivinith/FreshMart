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

const useStyles = makeStyles({

    media: {
      height: 200,
      width: 250
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
    const  [toggleHeart, setToggleHeart] = useState(false)
    const [openModal ,setOpenModal] = useState(false)
    const filePath = '/images/'+file;

    const addTOC = () =>{
      card_detail.userID = localStorage.getItem('userId');
      console.log(stock);
      //console.log(parseInt(cid)+1)
      setToggleHeart(!toggleHeart)
      if(!toggleHeart){
        axios.post(
          'http://127.0.0.1:5000/addToCart',
          card_detail
        ).then((res)=>{
              console.log('added');
              if(res.data.code===200){
                console.log("carted");
                var cid = localStorage.getItem('cartItems');
                localStorage.setItem('cartItems',parseInt(cid)+1)
                //toast.success("Item added",{position:toast.POSITION.TOP_CENTER,autoClose:5000})
                window.location = '/'
              }else{
                toast.error("Cannot add more than stock:"+res.data.error+"",{position:toast.POSITION.TOP_CENTER,autoClose:5000})
                console.log(res.data.error);
              }

        })
      }
      
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
        // <div className="card_row">
            
        // <Card className="card" id={name}>
        //   <CardActionArea>
        //     <div className='overflow'>
        //       <CardMedia
        //         className={`cardImg ${classes.media}`}
        //         image={filePath}
        //         title="Contemplative Reptile"
        //       />
        //     </div>
        //     <CardContent className="card_content">
        //       <Typography gutterBottom variant="h5" component="h2">
        //         {name}
        //       </Typography>
        //       <Typography gutterBottom variant="h5" component="h2">
        //         {price}$    Available: {stock} 
        //       </Typography>
        //       <Typography paragraph>
        //         {Desc} 
        //       </Typography>
                
        //     </CardContent>
        //   </CardActionArea>
        //   <CardActions>
        //   <Button size="small" color="primary" onClick={addTOC}>
        //   Add to cart          
        // </Button>  
        //   {/* <IconButton aria-label="add to favorites" color={toggleHeart ? 'secondary' : 'default'} 
        //     onClick={changeColor}>
        //         <FavoriteIcon />
        //     </IconButton> */}
        //     {adminBtn}
        //   </CardActions>
        // </Card>
        
        // </div>
        <div>
        {/* <Fade cascade> */}
        <div className="card_row">     
        <Card className="card" id={name} >
          <CardActionArea onClick={()=>{setOpenModal(!openModal)}}>
            <div className='overflow'>
              <CardMedia
                className={`cardImg ${classes.media}`}
                image={filePath}
                title="Contemplative Reptile"
              />
            </div>
            <CardContent className="card_content">
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {price}$    Available: {stock} 
              </Typography>
              <Typography paragraph>
                {Desc} 
              </Typography>
                
            </CardContent>
          </CardActionArea>
          <CardActions>
          <Button size="small" color="primary" onClick={addTOC}>
          Add to cart          
        </Button>  
          {/* <IconButton aria-label="add to favorites" color={toggleHeart ? 'secondary' : 'default'} 
            onClick={changeColor}>
                <FavoriteIcon />
            </IconButton> */}
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
                      <div>{price}</div>
                      <button
                        className="button primary"
                        onClick={() => {
                          this.props.addToCart(card_detail);
                          this.closeModal();
                        }}
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