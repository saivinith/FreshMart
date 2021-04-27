import axios from 'axios'
import React, { Component } from 'react'
import Productitem from './Productitem'
import './home.css'
//import {Container,Row,Col} from 'react-bootstrap'
//import 'bootstrap/dist/css/bootstrap.min.css';
import Grid from '@material-ui/core/Grid';
import ReactPaginate from 'react-paginate'

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            id:'',
            name:'',
            price:'',
            stock:'',
            shortDesc:'',
            description:'',
            selectedFile:null,
            prod : [],
            offset: 0,
            orgProd: [],
            perPage: 3,
            currentPage: 0,
            pageCount: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }
   
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
		const data = this.state.orgProd;
		
		const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
		this.setState({
			pageCount: Math.ceil(data.length / this.state.perPage),
			prod:slice
		})
	
    }

    componentDidMount() {
        this.getProducts();
    }
    getProducts = () =>{
        axios.get('/fetchProducts')
        .then((res)=>{
            const products = res.data;
            var slice = products.slice(this.state.offset, this.state.offset + this.state.perPage)

            this.setState({
                pageCount: Math.ceil(products.length / this.state.perPage),
                orgProd : products,
                prod:slice
            })
            //console.log(products)
        })
        .catch(()=>{
            console.log('error home')
        })
    }
    
    displayProducts = (items) =>{
        if(!items.length) return null;
        items = items.filter(
            (val) =>{
                if(this.props.searchInput === ""){
                    return val;
                }
                else if(val.name.toLowerCase().includes(this.props.searchInput.toLowerCase())){
                    return val;
                }
            }
            
        );
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

                    <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>        
 

        )
    }
}
export default Home;