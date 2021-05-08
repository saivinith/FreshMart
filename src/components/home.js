import axios from 'axios'
import React, { Component } from 'react'
import Productitem from './Productitem'
import './home.css'
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
            pageCount: 0,
            nonFiltProd: []
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
    // static getDerivedStateFromProps() {
    //     console.log('in componentDidUpdate');
    //     var items = this.state.orgProd;
        

    //     const products = items;
    //         var slice = products.slice(this.state.offset, this.state.offset + this.state.perPage)

    //         this.setState({
    //             pageCount: Math.ceil(products.length / this.state.perPage),
    //             prod:slice
    //         })
    // }
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
        
        return items.map((key,index) => (
              
            <div  key={index} className="grid-element">
                    <Productitem id={key._id} name={key.name} price = {key.price} stock = {key.stock} shortdesc = {key.shortDesc} Desc={key.description} 
                    file={key.file} category={key.category}/>

            </div>
            ))  
    };

    componentWillReceiveProps() {

        console.log(this.props.filterCategory);
       axios.get('/fetchProducts')
       .then((res)=>{
           var products = res.data;
           products = products.filter(
            // eslint-disable-next-line
            (val) =>{
                if(this.props.searchInput === ""){
                    return val;
                }
                else if(val.name.toLowerCase().includes(this.props.searchInput.toLowerCase())){
                    return val;
                }
            }
            
            );
            console.log(this.props.filterCategory.length);

            // applying category filter
            products = products.filter(
                // eslint-disable-next-line
                (val) =>{
                    if(this.props.filterCategory.length === 0){
                        return val;
                    }
                    else if(this.props.filterCategory.includes(val.category)){
                        return val;
                    }
                }
                
                );

           var slice = products.slice(this.state.offset, this.state.offset + this.state.perPage)

           this.setState({
               pageCount: Math.ceil(products.length / this.state.perPage),
               orgProd : products,
               prod:slice
           })
       })
       .catch(()=>{
           console.log('error home')
       })

       

      }
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
                    {this.state.prod.length>0 &&
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
                }
            </div>        
 

        )
    }
}
export default Home;