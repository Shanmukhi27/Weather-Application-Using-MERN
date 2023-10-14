import React, { useState, useEffect } from "react";
import Axios from "axios";

function Form() {
  const [city, setCity] = useState("");
  const [data, setData] = useState({temp:"",des:"",imgURL:"",humid:""});

  function handleClick(event) {
    event.preventDefault();
    const reqcity = document.getElementById("city").value;
    setCity(reqcity);
    console.log(reqcity);

    Axios.post("http://localhost:4500/", {
      city: reqcity
    }).then(res => {
      console.log(res.data);
       if(typeof(res.data)==="string"){
        alert(res.data);
       }
       else{
      
       setData({
        temp:res.data.temp,
        des:res.data.des,
        imgURL:res.data.imgURL,
        humid:res.data.humidity
        

   }
       );
  }
  
    });
  }


  return (
    <div>
      <div>
        <form action="/" method="post">
          <input  id="city" name="city" type="text" placeholder="Enter City" />
          <button onClick={handleClick} type="submit">Find Weather</button>
        </form>
        {city ? <div className="weatherData" >
            <img src={data.imgURL} alt="image1" />
            <div className="data">
              <div className="heading">
                <h2><i>City</i></h2>
                <h2><i>Temperature</i></h2>
                <h2><i> Weather</i></h2>
                <h2><i> Humidity</i></h2>
                </div>
                <div className="values"> 
                  <h2><i>:{city}</i></h2>
                  <h2><i>:{data.temp}</i></h2>
                  <h2><i>:{data.des}</i></h2>
                  <h2><i>:{data.humid}</i></h2>
               
                  </div>
            
            </div>

        </div>: <div></div>}
        
      </div>
    </div>
  );
}

export default Form;
