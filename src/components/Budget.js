// Budget.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, currency, dispatch } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const handleBudgetChange = (event) => {
        const value = parseInt(event.target.value, 10);
        const totalSpending = expenses.reduce((total, item) => {
            return total + item.cost;
        }, 0);

        if (value >= totalSpending) {
            setNewBudget(value);
            dispatch({ type: 'SET_BUDGET', payload: value });
        } else {
            alert('You cannot reduce the budget value lower than the spending');
        }
    };

    const increaseBudget = () => {
        const updatedBudget = newBudget + 10;
        setNewBudget(updatedBudget);
        dispatch({ type: 'INCREASE_BUDGET', payload: 10 });
    };

    const decreaseBudget = () => {
        const totalSpending = expenses.reduce((total, item) => {
            return total + item.cost;
        }, 0);
        const updatedBudget = newBudget - 10;

        if (updatedBudget >= totalSpending) {
            setNewBudget(updatedBudget);
            dispatch({ type: 'DECREASE_BUDGET', payload: 10 });
        } else {
            alert('You cannot reduce the budget value lower than the spending');
        }
    };

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency}{budget}</span>
            <div className="d-flex align-items-center">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">{currency}</span>
                    </div>
                    <input
                        type="number"
                        step="10"
                        value={newBudget}
                        onChange={handleBudgetChange}
                        className="form-control"
                    />
                </div>
                <button onClick={increaseBudget} className='btn btn-primary btn-sm m-1'>Increase by 10</button>
                <button onClick={decreaseBudget} className='btn btn-primary btn-sm m-1'>Decrease by 10</button>
            </div>
        </div>
    );
};

export default Budget;
