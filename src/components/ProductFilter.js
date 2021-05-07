import React, { Component } from "react";
import './ProductFilter.css';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
class ProductFilter extends Component{
    state={
    }
    componentDidMount(){
    }
    
    render() {
        return (
            <div className='centerBox'>
                  <h2 className="title">Apply Filters</h2>
              <br/>
              <FormControl component="fieldset" >
        <FormLabel component="legend">Select Categories</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox  onChange={this.props.applyCategoryFilter} name="Dairy" />}
            label="Dairy"
          />
          <FormControlLabel
            control={<Checkbox onChange={this.props.applyCategoryFilter} name="Vegetable" />}
            label="Vegetable"
          />
          <FormControlLabel
            control={<Checkbox  onChange={this.props.applyCategoryFilter} name="Fruits" />}
            label="Fruits"
          />
          <FormControlLabel
            control={<Checkbox  onChange={this.props.applyCategoryFilter} name="Choclates" />}
            label="Choclates"
          />
          <FormControlLabel
            control={<Checkbox  onChange={this.props.applyCategoryFilter} name="Groceries" />}
            label="Groceries"
          />
        </FormGroup>
      </FormControl>
            </div>
          );
    }
}
export default ProductFilter;
