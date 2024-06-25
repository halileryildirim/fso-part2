const CountryDetails = ({ country, weather }) => {
  const languages = Object.values(country.languages);
  const flagURL = country.flags.png;
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>Country
      <p>area {country.area}</p>
      <h2>languages: </h2>
      <ul>
        {languages.map((language, id) => (
          <li key={id}>{language}</li>
        ))}
      </ul>
      <div>
        <img src={flagURL} />
      </div>
      {weather.main && (
        <div>
          <h1>Weather in {weather.name}</h1>
          <p>temperature {weather.main.temp} Celcius</p>
          <img
            src={`https:openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          />
          <p>wind {weather.wind.speed}m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
