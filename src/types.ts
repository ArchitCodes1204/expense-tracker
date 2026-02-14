export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  isRecurring?: boolean;
}

export interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

export interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export interface SummaryProps {
  expenses: Expense[];
  monthlyIncome: number;
  onSetIncome: (income: number) => void;
} 
