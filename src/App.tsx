import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/custom.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Summary from './components/Summary';
import { Expense } from './types';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedIncome = localStorage.getItem('monthlyIncome');
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedIncome) setMonthlyIncome(JSON.parse(savedIncome));
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('monthlyIncome', JSON.stringify(monthlyIncome));
  }, [expenses, monthlyIncome]);

  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Smart Expense Tracker</h1>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <ExpenseForm onAddExpense={addExpense} />
            <Summary
              expenses={expenses}
              monthlyIncome={monthlyIncome}
              onSetIncome={setMonthlyIncome}
            />
          </div>
          <div>
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 