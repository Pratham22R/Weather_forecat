import { useState } from "react";
import SearchBox from "./SearchBox.jsx";
import InfoBox from "./infoBox.jsx";

export default function WeatherApp() {
  let style = {
    fontFamily: "Roboto",
    color: "#1976d2"
  }
  let [weatherInfo, setWeatherInfo] = useState({
    city: "Delhi",
    country: "India",
    temp: 25.05,
    temp_max: 30.05,
    temp_min: 20.05,
    feels_like: 25.05,
    description: "sunny",
    icon: "01d",
    humidity: 60,
    wind_speed: 10,
  });
  let updateInfo = (newInfo) => {
    setWeatherInfo(newInfo);
  };
  return (
    <div >
      <h1 style={style}>Weather App</h1>
      <SearchBox updateInfo={updateInfo} />
      <InfoBox Info={weatherInfo} />
    </div>
  );
}
