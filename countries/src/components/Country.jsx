const Country = ({ countries }) => {
  if (countries) {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
    if (countries.length < 10 && countries.length > 1) {
      return countries.map((country) => (
        <div key={country.cca3}>{country.name.common}</div>
      ));
    }
    if (countries.length === 1) {
      const country = countries[0];
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
        </div>
      );
    }
  } else {
    return;
  }
};

export default Country;
