import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const About = () => {
  const history = useHistory();
  const [userData, serUserData] = useState({});

const callAboutPage = async () => {
  try{
    const res = await fetch('/about', {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });

    const data = await res.json();
    console.log(data);
    serUserData(data);

    if (!res.status === 200) {
      const error = new Error(res.error);
      throw error;
    }

  } catch (err) {
    console.log(err);
    history.push('/login');
  }
}

useEffect(() => {
  callAboutPage();
}, []);

  
  return (
    <div>
    <p>{ userData.name }</p>
   
      <form method='GET'>
      <h1>{ userData.email }</h1>
      </form>
  </div>
  )
}

export default About
