const CountryDetails = ({ country }) => {
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
};

export default CountryDetails;
