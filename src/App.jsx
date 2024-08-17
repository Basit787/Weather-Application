import React, { useEffect, useState } from "react";
import { getWheaterCity } from "./apis/request";
import { Alert, Snackbar, TextField } from "@mui/material";

function App() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState([]);
  const [wrongCityName, setWrongCityName] = useState(false);

  useEffect(() => {
    wrongCityName && setOpen(true);
  }, [wrongCityName]);

  const handleChange = (e) => {
    setCityName(e.target.value);
  };

  const searchCity = async (e) => {
    if (e.charCode === 13) {
      try {
        const userCity = await getWheaterCity(cityName).get();
        console.log("the res is", userCity.data);
        setWeather(userCity.data);
        setCityName("");
      } catch (error) {
        console.log("th err is", error);
        setWrongCityName(true);
        setCityName("");
      }
    }
  };

  const backgroundImage = () => {
    if (weather) {
      if (Math.round(weather?.main?.temp - 273.15) <= 20) {
        return require("./assets/cold.jpg");
      } else if (
        Math.round(weather?.main?.temp - 273.15) > 20 &&
        Math.round(weather?.main?.temp - 273.15) < 30
      ) {
        return require("./assets/cloudy.jpg");
      } else if (Math.round(weather?.main?.temp - 273.15) >= 30) {
        return require("./assets/warm.jpg");
      } else {
        return "";
      }
    }
  };

  //snackbar
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div
      className="flex flex-col justify-center items-center backgroundImg"
      style={{
        backgroundImage: `url(${backgroundImage()})`,
      }}
    >
      <input
        type="search"
        label="Enter City Name"
        value={cityName}
        onChange={handleChange}
        placeholder="Input City name to get wheather"
        onKeyPress={searchCity}
        className="w-1/2 border-2 m-2 p-5 rounded-xl mt-10 border-none bg-sky-50"
      />

      {weather.length !== 0 && (
        <div className={`flex flex-col justify-center items-center text-white`}>
          <div className="m-5 text-2xl font-semibold">{weather?.name}</div>
          <div className="m-4 text-2xl font-semibold">
            {Math.round(weather?.main.temp - 273.15)}°C
          </div>
          <div className="m-4 text-2xl font-semibold">
            {weather?.weather[0].main}
          </div>
          <div className="m-4 text-2xl font-semibold">
            {weather?.weather[0].description}
          </div>
          <div className="m-4 text-2xl font-semibold">
            lat : {weather?.coord.lat} lon : {weather?.coord.lon}
          </div>
        </div>
      )}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Wrong City Name
        </Alert>
      </Snackbar>
    </div>
  );
}
export default App;
