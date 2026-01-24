import type {
  ProcessedExpense,
  DashboardStats,
  CategorySummary,
  TypeSummary,
  ResponsibleSummary,
  MonthlySummary,
} from '../types/Expense';

export const calculateDashboardStats = (expenses: ProcessedExpense[]): DashboardStats => {
  console.log('Calculating stats for expenses:', expenses);
  console.log('Unique types:', [...new Set(expenses.map(e => e.type))]);
  console.log('Unique categories:', [...new Set(expenses.map(e => e.category))]);
  
  // Calculate totals
  const totalIncome = expenses
    .filter((e) => e.type === 'Ingreso')
    .reduce((sum, e) => sum + e.amount, 0);

  const gastoExpenses = expenses.filter((e) => e.type === 'Gasto');
  console.log('Gasto expenses count:', gastoExpenses.length);
  console.log('Gasto expenses:', gastoExpenses);

  const totalExpenses = gastoExpenses.reduce((sum, e) => sum + Math.abs(e.amount), 0);
  console.log('Total expenses calculated:', totalExpenses);

  // Calculate current balance as sum of all Monto values
  const currentBalance = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Category breakdown (only expenses)
  const categoryMap = new Map<string, CategorySummary>();
  expenses
    .filter((e) => e.type === 'Gasto')
    .forEach((expense) => {
      const cat = expense.category || 'Sin categoría';
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, { name: cat, total: 0, count: 0 });
      }
      const summary = categoryMap.get(cat)!;
      summary.total += Math.abs(expense.amount);
      summary.count += 1;
    });

  const categoryBreakdown = Array.from(categoryMap.values()).sort(
    (a, b) => b.total - a.total
  );

  // Type breakdown (only expenses)
  const typeMap = new Map<string, TypeSummary>();
  expenses
    .filter((e) => e.type === 'Gasto')
    .forEach((expense) => {
      // Use the category as type since Tipo in CSV is actually the category type
      const typeValue = expense.category || 'Sin tipo';
      if (!typeMap.has(typeValue)) {
        typeMap.set(typeValue, { name: typeValue, total: 0, count: 0 });
      }
      const summary = typeMap.get(typeValue)!;
      summary.total += Math.abs(expense.amount);
      summary.count += 1;
    });

  const typeBreakdown = Array.from(typeMap.values()).sort((a, b) => b.total - a.total);

  // Responsible breakdown (only expenses)
  const responsibleMap = new Map<string, ResponsibleSummary>();
  expenses
    .filter((e) => e.type === 'Gasto')
    .forEach((expense) => {
      const resp = expense.responsible || 'Sin asignar';
      if (!responsibleMap.has(resp)) {
        responsibleMap.set(resp, { name: resp, total: 0, count: 0 });
      }
      const summary = responsibleMap.get(resp)!;
      summary.total += Math.abs(expense.amount);
      summary.count += 1;
    });

  const responsibleBreakdown = Array.from(responsibleMap.values()).sort(
    (a, b) => b.total - a.total
  );

  // Monthly trends
  const monthMap = new Map<string, MonthlySummary>();
  expenses.forEach((expense) => {
    const monthKey = `${expense.date.getFullYear()}-${String(
      expense.date.getMonth() + 1
    ).padStart(2, '0')}`;
    
    if (!monthMap.has(monthKey)) {
      monthMap.set(monthKey, {
        month: monthKey,
        income: 0,
        expenses: 0,
        net: 0,
      });
    }

    const summary = monthMap.get(monthKey)!;
    if (expense.type === 'Ingreso') {
      summary.income += expense.amount;
    } else {
      summary.expenses += Math.abs(expense.amount);
    }
    summary.net = summary.income - summary.expenses;
  });

  const monthlyTrends = Array.from(monthMap.values()).sort((a, b) =>
    a.month.localeCompare(b.month)
  );

  return {
    totalIncome,
    totalExpenses,
    currentBalance,
    transactionCount: expenses.length,
    categoryBreakdown,
    typeBreakdown,
    responsibleBreakdown,
    monthlyTrends,
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-BO', {
    style: 'currency',
    currency: 'BOB',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-BO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};
