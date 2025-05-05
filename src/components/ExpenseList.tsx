import React from 'react';
import { ExpenseListProps } from '../types';
import { format } from 'date-fns';

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Expense History</h2>
      {sortedExpenses.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">No expenses recorded yet</p>
      ) : (
        <div className="space-y-4">
          {sortedExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-800 dark:text-white">{expense.category}</h3>
                  <span className="text-red-600 dark:text-red-400 font-semibold">
                    ${expense.amount.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {format(new Date(expense.date), 'MMM dd, yyyy')}
                  {expense.description && (
                    <span className="ml-2">• {expense.description}</span>
                  )}
                  {expense.isRecurring && (
                    <span className="ml-2 text-blue-600 dark:text-blue-400">• Recurring</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="ml-4 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList; 