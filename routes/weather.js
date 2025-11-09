import express from "express";
import axios from "axios";

const router = express.Router();
const API_KEY = process.env.API_KEY;

router.get("/" , (req , res) =>{
   res.render("index");
});

router.post("/getWeather" , async (req , res) =>{
const city = req.body.city;
console.log(req.body);

try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

    const weatherData ={
         city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
    };

    res.render("result" , {weather : weatherData , error : null });

} catch (error) {
     console.error("Error fetching weather data:", error.message);
    res.render("result", {
      weather: null,
      error: "Could not retrieve weather data. Please check the city name and try again.",
    });
    
}
});

export default router;