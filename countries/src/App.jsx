import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  const hook = () => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        console.log(response.data);
        setCountries([...response.data]);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(hook, []);

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div>
        find countries <input value={query} onChange={handleQuery} />
      </div>
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          filteredCountries.map((country) => (
            <div key={country.cca3}>{country.name.common}</div>
          ))
        )}
      </div>
    </>
  );
};

export default App;
