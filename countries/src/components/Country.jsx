import { useState, useEffect } from "react";
import CountryDetails from "./CountryDetails";
import axios from "axios";

const Country = ({ countries }) => {
  const [shownCountry, setShownCountry] = useState(null);
  const [capital, setCapital] = useState(null);
  const [weather, setWeather] = useState({});
  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    if (capital) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`
        )
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  }, [capital]);

  useEffect(() => {
    if (countries.length === 1) {
      const country = countries[0];
      setCapital(country.capital[0]);
      setShownCountry(country);
    }
  }, [countries]);

  const handleShowClick = (country) => {
    setCapital(country.capital[0]);
    setShownCountry(country);
  };

  if (!countries) {
    return null;
  }
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map((country) => (
          <div key={country.cca3}>
            {country.name.common}
            <button onClick={() => handleShowClick(country)}>show</button>
            {shownCountry && shownCountry.cca3 === country.cca3 && (
              <CountryDetails country={shownCountry} weather={weather} />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (countries.length === 1 && shownCountry) {
    return <CountryDetails country={shownCountry} weather={weather} />;
  }
  return null;
};

export default Country;
