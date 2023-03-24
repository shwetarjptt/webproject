import React, {useState, useContext} from 'react';
import signpic from "../images/shoes.jpg";
import { NavLink, useHistory } from 'react-router-dom';

import { UserContext } from "../App";


const Login = () => {

    const {state, dispatch} = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch('/signin', {
            method: "POST",
            headers:  {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await res.json();
        console.log(data);
        if(res.status === 400 || !data){
            window.alert("invalid credencial");
        }else{
            dispatch({type:"USER", payload:true})
        window.alert("Login successfully");
            history.push("/");
        }
    }
  return (
    <>
       <main className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                       <div className="my-5">
                       <div>
                                <figure>
                                  <img src={signpic} alt="register pic" />
                                </figure>
                                <NavLink to="/signup" >I have no account</NavLink>
                              </div>
                            <form method="POST" id="contactForm" data-sb-form-api-token="API_TOKEN">
                           
                                <div className="form-floating">
                                    <input className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" placeholder="Enter your email..." data-sb-validations="required,email" />
                                    <label htmlFor="email">Email address</label>
                                    <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                    <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                                </div>
                               
                                <div className="form-floating">
                                    <input className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)}  id="password" type="password" placeholder="Enter your password number..." data-sb-validations="required" />
                                    <label htmlFor="password">Password</label>
                                    <div className="invalid-feedback" data-sb-feedback="password:required">A password number is required.</div>
                                </div>
                               
                                <br />
                               
                                <div className="d-none" id="submitSuccessMessage">
                                    <div className="text-center mb-3">
                                        <div className="fw-bolder">Form submission successful!</div>
                                        To activate this form, sign up at
                                        <br />
                                        <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                    </div>
                                </div>
                               
                                <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                               
                               <div>
                                    <input className="btn btn-primary text-uppercase" name="signin"  value="Login" id="signin" onClick={loginUser} type="submit" />
                                </div>
                            </form>
                              
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default Login
