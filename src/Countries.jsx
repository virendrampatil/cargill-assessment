import React, { useState, useEffect } from 'react';
import CountryRow from './CountryRow';
import './Countries.css';
import CountryDetails from './CountryDetails';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortType, setSortType] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    getCountries();
  }, []);

  const sortHandler = (sortByName) => {
    if (sortBy === sortByName && !sortType) {
      sortCountriesByDesc(sortByName);
    } else {
      sortCountriesByAsc(sortByName);
    }
  };

  const sortCountriesByAsc = (sortByName) => {
    const sortedCountries = countries.sort((a, b) =>
      a[sortByName]
        .toString()
        .toLowerCase()
        .localeCompare(b[sortByName].toString().toLowerCase())
    );

    setCountries(sortedCountries);
    setSortBy(sortByName);
    setSortType(0);
  };

  const sortCountriesByDesc = (sortByName) => {
    const sortedCountries = countries.sort((a, b) =>
      b[sortByName]
        .toString()
        .toLowerCase()
        .localeCompare(a[sortByName].toString().toLowerCase())
    );

    setCountries(sortedCountries);
    setSortBy(sortByName);
    setSortType(sortType);
  };

  const getCountries = () => {
    const uri = 'https://restcountries.eu/rest/v2/all';
    fetch(uri)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setSearchedCountries(data);
      });
  };

  const selectedCountryHandler = (country) => {
    setSelectedCountry(country);
  };

  const closeDialogHandler = () => {
    setSelectedCountry({});
  };

  const filterHandler = (e) => {
    const lowerCaseSearchedText = e.target.value;
    const filteredCountries = countries.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerCaseSearchedText) ||
        item.alpha3Code.toLowerCase().includes(lowerCaseSearchedText)
    );

    setSearchedCountries(filteredCountries);
    setSearchText(lowerCaseSearchedText);
  };

  return (
    <div className="container">
      <div className="search-container">
        <div>Search Country</div>
        <div>
          <input type="text" onKeyUp={filterHandler}></input>
        </div>
      </div>
      <div className="country-container">
        <div className="country-table">
          <table>
            <thead className="country-header">
              <tr>
                <th onClick={() => sortHandler('name')}>Country</th>
                <th onClick={() => sortHandler('population')}>Population</th>
                <th onClick={() => sortHandler('capital')}>Capital</th>
              </tr>
            </thead>
            <tbody>
              {searchedCountries.map((country) => (
                <CountryRow
                  key={country.id}
                  country={country}
                  selectedCountry={selectedCountryHandler}
                />
              ))}
            </tbody>
          </table>
        </div>
        {Object.keys(selectedCountry).length !== 0 && (
          <CountryDetails
            country={selectedCountry}
            onClose={closeDialogHandler}
          />
        )}
      </div>
    </div>
  );
};

export default Countries;
