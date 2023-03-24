import React, {useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import signpic from "../images/shoes.jpg";

const Signup = () => {

  const history = useHistory();
  const[user, setUser] = useState({
    name: "", email: "", phone: "", work: "", password: "", cpassword: ""
  })

  let name, value;
  const handleInputs =(e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value})

  }


const PostData = async (e) => {
  e.preventDefault(); 
  const { name, email, phone, work, password, cpassword } = user;

  const res = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      name, email, phone, work, password, cpassword
    })
  });

 const data = await res.json();
 if(res.status === 422 || !data){
  window.alert("Invalid Registration");
  console.log("Invalid Registration");
 }else{
  window.alert("successsfully Registration");
  console.log("successsfully Registration");

  history.push("/login");
 }
}


  return (
    <>
        <main className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                       <div className="my-5">
                           
                            <form method="POST" id="register-form" data-sb-form-api-token="API_TOKEN">
                            <div className="form-floating">
                                    <input className="form-control" name="name" id="name" type="text" value={user.name} onChange={handleInputs} placeholder="Enter your name..." data-sb-validations="required" />
                                    <label htmlFor="name">Name</label>
                                    <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                                </div>
                                <div className="form-floating">
                                    <input className="form-control" name="email" id="email" type="email" value={user.email} onChange={handleInputs} placeholder="Enter your email..." data-sb-validations="required,email" />
                                    <label htmlFor="email">Email address</label>
                                    <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                    <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                                </div>
                                <div className="form-floating">
                                    <input className="form-control" name="phone" id="phone" type="number" value={user.phone} onChange={handleInputs} placeholder="Enter your phone number..." data-sb-validations="required" />
                                    <label htmlFor="phone">Phone Number</label>
                                    <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                                </div>
                                <div className="form-floating">
                                    <input className="form-control" name="work" id="work" type="text" value={user.work} onChange={handleInputs} placeholder="Enter your work number..." data-sb-validations="required" />
                                    <label htmlFor="work">Work</label>
                                    <div className="invalid-feedback" data-sb-feedback="work:required">A work number is required.</div>
                                </div>
                                <div className="form-floating">
                                    <input className="form-control" name="password" id="password" type="password" value={user.password} onChange={handleInputs} placeholder="Enter your password number..." data-sb-validations="required" />
                                    <label htmlFor="password">Password</label>
                                    <div className="invalid-feedback" data-sb-feedback="password:required">A password number is required.</div>
                                </div>
                                <div className="form-floating">
                                    <input className="form-control" name="cpassword" id="cpassword" type="password" value={user.cpassword} onChange={handleInputs} placeholder="Enter your confirm password number..." data-sb-validations="required" />
                                    <label htmlFor="cpassword">Confirm Password</label>
                                    <div className="invalid-feedback" data-sb-feedback="password:required">A  confirm password number is required.</div>
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
                                    <input className="btn btn-primary text-uppercase" name="signup"  value="Register" id="signup" type="submit" onClick={PostData} />
                                </div>
                            </form>
                              <div>
                                <figure>
                                  <img src={signpic} alt="register pic" />
                                </figure>
                                <NavLink to="/login" >I am alredy register</NavLink>
                              </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </>
  )
}

export default Signup
