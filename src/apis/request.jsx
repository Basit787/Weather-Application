import axios from "axios";

const apiKey = "4974b66fa2bb8b1b2a76753b81f24983";

export const getWheaterCity = (city) => {
  const instance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
  });
  return instance;
};
