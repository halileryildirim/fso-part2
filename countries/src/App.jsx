import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  const hook = () => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries([...response.data]);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error:", error);
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
      <Country countries={filteredCountries} />
    </>
  );
};

export default App;
