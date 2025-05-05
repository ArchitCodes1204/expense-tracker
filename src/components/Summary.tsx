import React, { useState } from 'react';
import { SummaryProps } from '../types';
import { format, startOfMonth, endOfMonth } from 'date-fns';

const Summary: React.FC<SummaryProps> = ({ expenses, monthlyIncome, onSetIncome }) => {
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [tempIncome, setTempIncome] = useState(monthlyIncome.toString());

  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startOfMonth(new Date()) && expenseDate <= endOfMonth(new Date());
  });

  const totalExpenses = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const safeToSpend = monthlyIncome - totalExpenses;
  const spendingPercentage = monthlyIncome > 0 ? (totalExpenses / monthlyIncome) * 100 : 0;

  const handleIncomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncome = parseFloat(tempIncome);
    if (!isNaN(newIncome) && newIncome >= 0) {
      onSetIncome(newIncome);
      setIsEditingIncome(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Monthly Summary</h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Monthly Income
            </label>
            {isEditingIncome ? (
              <form onSubmit={handleIncomeSubmit} className="flex items-center">
                <input
                  type="number"
                  value={tempIncome}
                  onChange={(e) => setTempIncome(e.target.value)}
                  className="w-32 px-2 py-1 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter amount"
                />
                <button
                  type="submit"
                  className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="flex items-center">
                <span className="text-gray-800 dark:text-white font-semibold">
                  ${monthlyIncome.toFixed(2)}
                </span>
                <button
                  onClick={() => setIsEditingIncome(true)}
                  className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Expenses (This Month)
            </span>
            <span className="text-red-600 dark:text-red-400 font-semibold">
              ${totalExpenses.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full"
              style={{ width: `${Math.min(spendingPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Safe to Spend
            </span>
            <span className={`font-semibold ${safeToSpend >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${safeToSpend.toFixed(2)}
            </span>
          </div>
        </div>

        {spendingPercentage >= 80 && (
          <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-md">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              ⚠️ Warning: You've spent {spendingPercentage.toFixed(1)}% of your monthly income!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary; 