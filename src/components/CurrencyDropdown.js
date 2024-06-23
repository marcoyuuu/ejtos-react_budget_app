// CurrencyDropdown.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencyDropdown = () => {
    const { currency, dispatch } = useContext(AppContext);

    const handleCurrencyChange = (event) => {
        dispatch({ type: 'CHG_CURRENCY', payload: event.target.value });
    };

    return (
        <div className='dropdown'>
            <label htmlFor='currency'>Currency: </label>
            <select id='currency' value={currency} onChange={handleCurrencyChange} className='form-select'>
                <option value='$'>Dollar ($)</option>
                <option value='£'>Pound (£)</option>
                <option value='€'>Euro (€)</option>
                <option value='₹'>Rupee (₹)</option>
            </select>
        </div>
    );
};

export default CurrencyDropdown;
