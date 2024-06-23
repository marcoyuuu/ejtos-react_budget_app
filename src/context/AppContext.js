// AppContext.js
import React, { createContext, useReducer } from 'react';

// Reducer function to handle different actions
export const AppReducer = (state, action) => {
    let updatedExpenses;
    switch (action.type) {
        case 'ADD_EXPENSE':
            updatedExpenses = state.expenses.map((expense) => {
                if (expense.name === action.payload.name) {
                    return { ...expense, cost: expense.cost + action.payload.cost };
                }
                return expense;
            });
            return { ...state, expenses: updatedExpenses };

        case 'RED_EXPENSE':
            updatedExpenses = state.expenses.map((expense) => {
                if (expense.name === action.payload.name && expense.cost - action.payload.cost >= 0) {
                    return { ...expense, cost: expense.cost - action.payload.cost };
                }
                return expense;
            });
            return { ...state, expenses: updatedExpenses };

        case 'DELETE_EXPENSE':
            updatedExpenses = state.expenses.filter(expense => expense.id !== action.payload);
            return { ...state, expenses: updatedExpenses };

        case 'SET_BUDGET':
            if (action.payload >= state.expenses.reduce((total, item) => total + item.cost, 0)) {
                return { ...state, budget: action.payload };
            } else {
                alert('You cannot reduce the budget value lower than the spending');
                return state;
            }

        case 'INCREASE_BUDGET':
            return { ...state, budget: state.budget + action.payload };

        case 'DECREASE_BUDGET':
            const totalSpending = state.expenses.reduce((total, item) => total + item.cost, 0);
            if (state.budget - action.payload >= totalSpending) {
                return { ...state, budget: state.budget - action.payload };
            } else {
                alert('You cannot reduce the budget value lower than the spending');
                return state;
            }

        case 'CHG_CURRENCY':
            return { ...state, currency: action.payload };

        default:
            return state;
    }
};

// Initial state
const initialState = {
    budget: 2000,
    expenses: [
        { id: 'Marketing', name: 'Marketing', cost: 750 },
        { id: 'Finance', name: 'Finance', cost: 300 },
        { id: 'Sales', name: 'Sales', cost: 70 },
        { id: 'Human Resource', name: 'Human Resource', cost: 40 },
        { id: 'IT', name: 'IT', cost: 500 },
    ],
    currency: '£',
};

// Create context
export const AppContext = createContext();

// Provider component
export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining: state.budget - state.expenses.reduce((total, item) => total + item.cost, 0),
                dispatch,
                currency: state.currency,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
