import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { ProcessedExpense } from '../types/Expense';
import { formatCurrency } from '../utils/dataProcessing';

interface MonthlyIncomeChartProps {
  expenses: ProcessedExpense[];
}

const COLORS = ['#4caf50', '#8bc34a', '#cddc39', '#9ccc65', '#aed581', '#81c784'];

const MonthlyIncomeChart = ({ expenses }: MonthlyIncomeChartProps) => {
  const monthMap = new Map<string, Record<string, number>>();

  expenses
    .filter((e) => e.type === 'Ingreso')
    .forEach((expense) => {
      const monthKey = `${expense.date.getFullYear()}-${String(expense.date.getMonth() + 1).padStart(2, '0')}`;

      if (!monthMap.has(monthKey)) {
        monthMap.set(monthKey, {});
      }

      const monthData = monthMap.get(monthKey)!;
      const category = expense.category || 'Sin categoría';
      monthData[category] = (monthData[category] || 0) + Math.abs(expense.amount);
    });

  const allCategories = new Set<string>();
  expenses
    .filter((e) => e.type === 'Ingreso')
    .forEach((expense) => {
      allCategories.add(expense.category || 'Sin categoría');
    });

  const chartData = Array.from(monthMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({ month, ...data }));

  const categories = Array.from(allCategories).sort();

  return (
    <div className="chart-container">
      <h3>Ingresos por Categoría - Tendencia Mensual</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
          {categories.map((category, index) => (
            <Bar
              key={category}
              dataKey={category}
              stackId="income"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyIncomeChart;
