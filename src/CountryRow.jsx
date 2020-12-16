import React from 'react';
import './CountryRow.css';

const CountryRow = (props) => {
    const {country} = props;
    return (
    <tr className='country-row' onClick={() => props.selectedCountry(country)}>
        <td>{country.name}</td>
        <td>{country.population}</td>
        <td>{country.capital}</td>
    </tr>
    );
}

export default CountryRow;