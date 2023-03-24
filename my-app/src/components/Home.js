import React, { useEffect, useState } from 'react';

const Home = () => {

  const [userData, setUserName] = useState('');
  const [show, setshow] = useState(false);

  const userHomePage = async () => {
    try{
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      const data = await res.json();
      console.log(data);
      setUserName({...userData, name:data.name });
      setshow(true);
  
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
  
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <div>
      <p>Welcome</p>
      <h1>{userData.name}</h1>
      <h2>{show ? 'happy, to see you again' : 'We Are the Mern Developer' }</h2>
    </div>
  )
}

export default Home
