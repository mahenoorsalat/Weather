import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';


function App() {
  const [city , setCity] = useState("Delhi");
  const [weather , setWeather] = useState(null);
  const currentDate = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]
const API_KEY = "bcda10ba323e88e96cb486015a104d1d";
const fetchWeather = async ()=>{
  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    const data = await response.json();
    console.log(data)
    setWeather(data)
  }
  catch (error){
    console.log(error)
  }
}

useEffect(() => {
fetchWeather();
}, [])


const handleInput = (event)=>{
  setCity(event.target.value)
}


const handleSubmit = (event) =>{
  event.preventDefault();
  fetchWeather();
}

const month = months[currentDate.getMonth()];
const date = currentDate.getDate();
const year = currentDate.getFullYear();

const formattedDate = `${month} ${date} , ${year}`

const getWeatherURL = (main) =>{
  switch (main){
    case "Clouds" :
      return process.env.PUBLIC_URL + "/thunder.png";
    case "Rain" :
      return process.env.PUBLIC_URL + "/rain.png";
    case "Mist" :
      return process.env.PUBLIC_URL + "/Tornado.png";
    case "Haze" :
      return process.env.PUBLIC_URL + "/sun.png";
    default :
      return null;
  }
}
  return (
    <div className="App">
      <div className="container">

        {weather && (

          <>  
                <h1 className="container_date">
          {formattedDate}
        </h1>
        <div className="weather_data">
          <h2 className="container_city">
            {weather.name}
          </h2>
          <img src={getWeatherURL(weather.weather[0].main)}  width='130px' alt="icon" className="container_img" />

          <h2 className="container_degree">
            {weather.main.temp}
          </h2>
          <h2 className="container_per">
            {weather.weather[0].main}
          </h2>
          <form className='form' onSubmit={handleSubmit}>
            <input type="text" className='input' placeholder='Enter City Name' onChange={handleInput} />
            <button type="submit">Get</button>
          </form>
        </div>
        </>
        )}







      </div>
    </div>
  );
}

export default App;
