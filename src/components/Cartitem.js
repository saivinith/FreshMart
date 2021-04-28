import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import FavoriteIcon from '@material-ui/icons/Favorite';,{useState,useEffect}
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Productitem.css'
import axios from 'axios';
const useStyles = makeStyles({

    media: {
      height: 200,
      width: 250
    }
  });

function Cartitem({id,cardId,name,price,stock,shortdesc,Desc,file,category,quantity}) {
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
    // const user = localStorage.getItem('user');
    // const accesscode = localStorage.getItem('accesscode');
    const classes = useStyles();
    const filePath = '/images/'+file;

    const cartDelete = () =>{
      card_detail.userID = localStorage.getItem('userId');
      //console.log(localStorage.getItem('cartItems')+1);
      axios.post(
        'http://127.0.0.1:5000/DeleteCartItem',
        {id:id}
      ).then((res)=>{
            //console.log('deleted');
            if(res.data.code===200){
              //console.log("deleted");
              var did = localStorage.getItem('cartItems')
              localStorage.setItem('cartItems',parseInt(did)-1)
              window.location = '/cart'
            }else{
              toast.error("Cannot add more than stock:"+res.data.error+"",{position:toast.POSITION.TOP_CENTER,autoClose:5000})
              console.log(res.data.error);
            }
      })
      }

    return (
        <div className="card_row">
            
        <Card className="card" id={name}>
          <CardActionArea>
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
                 price: ${price}   
              </Typography>
              <Typography gutterBottom variant="subtitle1" component="h2" color="textSecondary" >
                 quantity: {quantity} 
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
          <Button size="small" color="primary" onClick={cartDelete}>
          Remove
        </Button>  
          {/* <IconButton aria-label="add to favorites" color={toggleHeart ? 'secondary' : 'default'} 
            onClick={changeColor}>
                <FavoriteIcon />
            </IconButton> */}
            {/* {adminBtn} */}
          </CardActions>
        </Card>
        
        </div>
      );
    }

export default Cartitem