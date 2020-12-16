import './CountryDetails.css';

const CountryDetails = (props) => {
    const {country} = props;
    return(
        <div className='country-details'>
            <div className='country-details-header'>
                <div>{country.name} Details</div>
                <div onClick={() => props.onClose()}>X</div>
            </div>
            <div className='country-details-body'>
                <div>City : {country.capital}</div>
                <div>Currency : {country.currencies[0].name}</div>
                <div>Language : {country.languages[0].name}</div>
                
            </div>
        </div>
    );
}

export default CountryDetails;