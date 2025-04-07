import React, { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formattedDate = `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
  const API_KEY = "bcda10ba323e88e96cb486015a104d1d"; // Replace with your API key

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setError(data.message);
        setWeatherData(null);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again later.");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]); // Fetch data whenever city changes

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clear":
        return "/sun.png";
      case "Rain":
        return "/icons/rainy.png";
      case "Snow":
        return "/icons/snowy.png";
      case "Haze":
        return "/sun.png";
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="container">
        {weatherData && (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>
              <img
                className="container_img"
                src={getWeatherIconUrl(weatherData?.weather?.[0]?.main)}
                width="180px"
                alt="Weather Icon"
              />
              <h2 className="container_degree">{weatherData.main.temp}°C</h2>
              <h2 className="country_per">{weatherData.weather[0].main}</h2>
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleInputChange}
                  required
                />
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
