import { useState } from "react";
import CountryDetails from "./CountryDetails";

const Country = ({ countries }) => {
  const [shownCountry, setShownCountry] = useState(null);

  const handleShowClick = (country) => {
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
              <CountryDetails country={shownCountry} />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }

  return null;
};

export default Country;
