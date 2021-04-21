import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import axios from 'axios';
//import "bulma/css/bulma.css";
class Addproduct extends Component{
    state={
        name:'',
        price:'',
        stock:'',
        shortDesc:'',
        description:'',
        selectedFile:null
    }

    save = e =>{
        e.preventDefault();
        console.log(this.state.selectedFile);
        let form_data = new FormData();
        form_data.append('name',this.state.name)
        form_data.append('price',this.state.price)
        form_data.append('stock',this.state.stock)
        form_data.append('shortDesc',this.state.shortDesc)
        form_data.append('description',this.state.description)
        form_data.append('file',this.state.selectedFile)    
        
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
    };
    handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });
    handleFile(e){
        console.log(e.target.files);
        this.setState({
            selectedFile:e.target.files[0]
        })
    }
    render() {
        return (
            <>
              <div className="hero is-primary ">
                <div className="hero-body container">
                  <h4 className="title">Add Product</h4>
                </div>
              </div>
              <br />
              <br />
              <form onSubmit={this.save}>
                <div className="columns is-mobile is-centered">
                  <div className="column is-one-third">
                    <div className="field">
                      <label className="label">Product Name: </label>
                      <input
                        className="input"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="field">
                      <label className="label">Price: </label>
                      <input
                        className="input"
                        type="number"
                        name="price"
                        value={this.state.price}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="field">
                      <label className="label">Available in Stock: </label>
                      <input
                        className="input"
                        type="number"
                        name="stock"
                        value={this.state.stock}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="field">
                      <label className="label">Short Description: </label>
                      <input
                        className="input"
                        type="text"
                        name="shortDesc"
                        value={this.state.shortDesc}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="field">
                      <label className="label">Description: </label>
                      <textarea
                        className="textarea"
                        type="text"
                        rows="2"
                        style={{ resize: "none" }}
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="field">
                      <label className="label">Upload Image: </label>
                      <input
                        type="file"
                        style={{ resize: "none" }}
                        name="selectedFile"
                        //value={this.state.selectedFile}
                        onChange={(e)=>this.handleFile(e)}
                      />
                    </div>
                    {this.state.flash && (
                      <div className={`notification ${this.state.flash.status}`}>
                        {this.state.flash.msg}
                      </div>
                    )}
                    <div className="field is-clearfix">
                      <button
                        className="button is-primary is-outlined is-pulled-right"
                        type="submit"
                        onClick={this.save}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </>
          );
    }
}
export default Addproduct;
