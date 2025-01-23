import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function SearchBox({ updateInfo }) {
  const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
  const api_Key = "//GET YOUR API KEY HERE";//3b3964cb12127a3c335388d105bca414

  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getWeatherInfo = async (city) => {
    if (!api_Key) {
      console.error("API Key is missing!");
      return;
    }

    const url = `${API_URL}q=${city}&appid=${api_Key}&units=metric`;
    try {
      const res = await fetch(url);
      if (res.status === 404) {
        setErrorMessage(`Sorry, we don't have information about "${city}".`);
        return null;
      }
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      setErrorMessage(""); 
      let data = await res.json();
      let result = {
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        feels_like: data.main.feels_like,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
      };
      return result;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCity(""); 
    let newInfo = await getWeatherInfo(city);
    updateInfo(newInfo);
  };

  return (
    <Card
      sx={{
        maxWidth: 280,
        margin: "auto",
        padding: 2,
        boxShadow: "0px 4px 20px rgba(0, 0, 255, 0.8)",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", color: "primary.main", marginBottom: 2 }}
        >
          Search Weather
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="city"
            label="Enter City"
            variant="outlined"
            required
            value={city}
            onChange={handleChange}
            sx={{
              width: "100%",
              marginBottom: 2,
            }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "100%",
              backgroundColor: "blue",
              "&:hover": { backgroundColor: "darkblue" },
            }}
          >
            Search
          </Button>
        </form>
        {errorMessage && (
          <Typography
            variant="body2"
            color="error"
            sx={{ marginTop: 2, fontWeight: "bold" }}
          >
            {errorMessage}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
