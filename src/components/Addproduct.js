import React, { Component } from "react";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
//import "bulma/css/bulma.css";
import './Addproduct.css'
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
class Addproduct extends Component{
    state={
        id:'',
        name:'',
        price:'',
        stock:'',
        shortDesc:'',
        description:'',
        selectedFile:null,
        category:'',
        deleted:0,
        edit:0
    }
    componentDidMount(){
      var item = localStorage.getItem('cardItem');
      if(item){
        this.setState({
          id:JSON.parse(item).id,
          name:JSON.parse(item).name,
          price:JSON.parse(item).price,
          stock:JSON.parse(item).stock,
          shortDesc:JSON.parse(item).shortdesc,
          description:JSON.parse(item).Desc,
          category:JSON.parse(item).category,  
          edit:1
        })
      }
      localStorage.removeItem('cardItem');
    }
    save = e =>{
        e.preventDefault();
        console.log(this.state.category);
        let form_data = new FormData();
        form_data.append('name',this.state.name)
        form_data.append('price',this.state.price)
        form_data.append('stock',this.state.stock)
        form_data.append('shortDesc',this.state.shortDesc)
        form_data.append('description',this.state.description)
        form_data.append('file',this.state.selectedFile)    
        form_data.append('category',this.state.category)
        form_data.append('deleted',this.state.deleted)  
        if(!this.state.edit){
          axios.post(
            'http://127.0.0.1:5000/product',
            form_data
          ).then((res)=>{
              console.log("success");
              console.log(res);
            this.setState(
                { flash: { status: 'is-success', msg: 'Product created successfully' }}
              );
              window.location = '/';
          })
        }else{
          form_data.append('id',this.state.id) 
          console.log('id',this.state.id);
          axios.post(
            'http://127.0.0.1:5000/edit',
            form_data
          ).then((res)=>{
              console.log("success");
              console.log(res);
            this.setState(
                { flash: { status: 'is-success', msg: 'Product Updated successfully' }}
              );
              window.location = '/';
          })
        }
        
    };
    handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });
    handleFile(e){
      const types = ['image/png','image/jpeg','image/jpg'];
        //console.log(e.target.files);
        let selected = e.target.files[0]
        if(selected && types.includes(selected.type)){
            this.setState({
              selectedFile:e.target.files[0]
          })
        }else{
          this.setState(
            { flash: { status: 'is-danger', msg: 'Only Images are accepted' }}
          );
        }
        
    }
    //const [category, setCategory] = React.useState('');

    handleCategoryChange(e){
    this.setState({category:e.target.value})
        //console.log(category);
 }

 
    render() {
        return (
            <div className='centerBox1'>
                  <h2 className="title">Add Product</h2>
              <br/>
              <form onSubmit={this.save}>
                <div className="columns is-mobile is-centered">
                  <div className="column is-one-third">
                      
                      <TextField
                        className="align-items"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                        label="product name"
                        variant="outlined" 
                      />
                      <TextField
                        className="align-items"
                        type="number"
                        name="price"
                        value={this.state.price}
                        onChange={this.handleChange}
                        required
                        label="price"
                        variant="outlined" 
                      />
                      <TextField
                        className="align-items"
                        type="number"
                        name="stock"
                        value={this.state.stock}
                        onChange={this.handleChange}
                        label="Quantity"
                        variant="outlined" 
                      />
                      <TextField
                        className="align-items"
                        type="text"
                        name="shortDesc"
                        value={this.state.shortDesc}
                        onChange={this.handleChange}
                        label="short Description"
                        variant="outlined" 
                      />
                      <TextField
                        className="align-items"
                        id="outlined-multiline-static"
                        label="Multiline"
                        multiline
                        rows={4}
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        defaultValue="Default Value"
                        variant="outlined"
                      />

                      <TextField
                      className="align-items"
                          id="outlined-select-currency"
                          select
                          label="Select"
                          value={this.state.category}
                          onChange={(e)=>this.handleCategoryChange(e)}
                          variant="outlined"
                        >
                      <MenuItem key="0" >Select</MenuItem>
                      <MenuItem  key="1" value="Dairy">Dairy</MenuItem>
                      <MenuItem key="2" value="Vegetable">Vegetable</MenuItem>
                      <MenuItem key="3" value="Fruits">Fruits</MenuItem>
                      <MenuItem key="4" value="Choclates">Choclates</MenuItem>
                      <MenuItem key="5" value="Groceries">Groceries</MenuItem>

                      </TextField>
                                  <TextField
                                  className="align-items"
                                    name="selectedFile"
                                    onChange={(e)=>this.handleFile(e)}
                                    type="file"
                                    variant="outlined"
                                  />
                                  {this.state.flash && (
                                    <div className={`notification ${this.state.flash.status}`}>
                                      {this.state.flash.msg}
                                    </div>
                                  )}

                <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        className={`align-items button_add`}
                        startIcon={<SaveIcon />}
                        style={{
                          backgroundColor: "#e9b533",
                          
                      }}
                        onClick={this.save}
                      >
                        ADD Product
                      </Button>
                    
                  </div>
                </div>
              </form>
            </div>
          );
    }
}
export default Addproduct;
