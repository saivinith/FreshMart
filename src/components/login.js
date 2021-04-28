import React,{Component} from 'react'
import './login.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
class Login extends Component {
    state = {
        email:'', 
        password:'',
        error:false,
        errorValue:'',
        errorEmail:false,
        errorPwd:false       
    }
 
    validate = e =>{
        e.preventDefault();
        if(this.state.email.length===0 || this.state.password.length===0){
                this.setState({error:true,errorValue:'*Please enter valid Email and Password'})
                if(this.state.email.length===0)
                    this.setState({errorEmail:true})
                if(this.state.password.length===0)
                    this.setState({errorPwd:true})
        }
        else{
            var re = /\S+@\S+\.\S+/;
			if(!re.test(this.state.email)){
                this.setState({error:true,errorValue:'*Please enter valid Email'})
            }
            else{
            axios.post('http://127.0.0.1:5000/validate',{          
                email:this.state.email,
                password:this.state.password,
        }).then((res)=>{
           if(res.data.code===200){
            console.log(res);   
            localStorage.setItem("user", JSON.stringify(res.data.username));
            localStorage.setItem("userId", JSON.stringify(res.data.userId));
            localStorage.setItem("cartItems", (res.data.cartItems));
            //console.log((res.data.cartItems)+1);
            if(res.data.username==="admin"){
                localStorage.setItem("accesscode", 1);
            }
            else{
                localStorage.setItem("accesscode", 0);
            }   
            //console.log(localStorage.getItem('cartItems'));
            window.location = '/';
        
           }
           else{
            console.log(res.data.code);
            console.log(res);
            this.setState({error:true,errorValue:'*Invalid Credentials'})
            this.setState({errorEmail:true})
            this.setState({errorPwd:true})
           }
            //window.location = '/';
            
        })  
    }  
        }
        
    }
    handleEmailChange = e =>{
        this.setState({
            email: e.target.value,
            error:false
        })
    }
    handlePasswordChange = e =>{
        this.setState({
            password: e.target.value,
            error:false
        })
    } 
    render() {
        return(    
            <div className="login">
                <div className="login_container">
                    <h1>Sign In</h1>
                    <form>
                        <h5>E-mail</h5>
                        <input type="email" className={!this.state.errorEmail?'':'errorType'} name="email" value = {this.state.email} onChange = {this.handleEmailChange} required/>
                        <h5>Password</h5>
                        <input type="password" className={!this.state.errorPwd?'':'errorType'} name="password" value = {this.state.password} onChange = {this.handlePasswordChange} required/>
                        {this.state.error&&(
                            <span><p className="error">{this.state.errorValue}</p></span>
                        )}
                        <Link to="/" >
                            <button type="submit" className="login_signIn" onClick={this.validate}>Sign In</button>
                        </Link>
                    </form>
                    <p>Create an account </p>
                    <Link to="/signup" >
                        <button className="login_register" >Create Account</button>
                    </Link>
                        
                    
                </div>
            </div>
        )
    }
}
export default Login