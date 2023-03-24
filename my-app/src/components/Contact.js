import React, { useEffect, useState } from 'react';

const Contact = () => {

  const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});

const userContact = async () => {
  try{
    const res = await fetch('/getdata', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    console.log(data);
    setUserData({...userData, name:data.name, email:data.email, phone:data.phone });

    if (!res.status === 200) {
      const error = new Error(res.error);
      throw error;
    }

  } catch (err) {
    console.log(err);
  }
}

useEffect(() => {
  userContact();
}, []);

const handleInputs = (e) => {

    const name = e.target.name;
    const value = e.target.value;

    setUserData({...userData, [name]:value })

}

const contactForm = async (e) => {
  e.preventDefault(); 
debugger;
  const {name, email, phone, message} = userData;

  const res = await fetch('/contact', {
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      name, email, phone, message
    })
  });

  const data = await res.json();
  if(!data){
    console.log('message not send');
  }else{
    alert('message send');
    setUserData({...userData, message: "" });
  }
}


  return (
    <div>
            <main className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="my-5">
                           
                            <form method="POST" id="contactForm">
                                <div className="form-floating">
                                    <input className="form-control" id="name" type="text" onChange={handleInputs} name="name" value={userData.name} placeholder="Enter your name..." data-sb-validations="required" />
                                    <label htmlFor="name">Name</label>
                                    <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                                </div>
                                <div className="form-floating">
                                    <input className="form-control" id="email" onChange={handleInputs} name="email" value={userData.email}  type="email" placeholder="Enter your email..." data-sb-validations="required,email" />
                                    <label htmlFor="email">Email address</label>
                                    <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                    <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                                </div>
                                <div className="form-floating">
                                    <input className="form-control" id="phone" onChange={handleInputs} name="phone" value={userData.phone} type="number" placeholder="Enter your phone number..." data-sb-validations="required" />
                                    <label htmlFor="phone">Phone Number</label>
                                    <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                                </div>
                                <div className="form-floating">
                                    <textarea className="form-control" id="message" onChange={handleInputs} name="message" value={userData.message} type="text" placeholder="Enter your message here..."  data-sb-validations="required"></textarea>
                                    <label htmlFor="message">Message</label>
                                    <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                                </div>
                                <br />
                                

                               
                                
                                <button className="btn btn-primary text-uppercase " id="submitButton" onClick={contactForm} type="submit">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
  </div>
  )
}

export default Contact
