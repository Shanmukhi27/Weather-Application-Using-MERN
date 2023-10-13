
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const https = require('node:https');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", function (req, res) {
  const city = req.body.city;
  console.log(city);

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + req.body.city + "&appid=ed59e68eef71b2077884eade733f74bd&units=metric";
 //http request to openweather api
  https.get(url, function (response) {
    console.log(response.statusCode);
   if(response.statusCode==404){
    res.send("City not found");
   }else{
    response.on("data", function (data) {
      try{
      const weatherData = JSON.parse(data);
              console.log(weatherData);
              if (weatherData && weatherData.weather && weatherData.weather[0]){
                const weatherDes=weatherData.weather[0].description
                const icon=weatherData.weather[0].icon;
                const imgUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
               const temp=JSON.parse(data).main.temp;
               const humid=JSON.parse(data).main.humidity;
               res.json({ temp: temp,
                imgURL:imgUrl,des:weatherDes,humidity:humid
             });
            }else{
                console.log("Invalid weather data received");
               }
 
}catch(err){
  console.log(err);
}

    });
  }
  });
});


app.listen(4500, () => {
  console.log("Server is running on port 4500");
});
