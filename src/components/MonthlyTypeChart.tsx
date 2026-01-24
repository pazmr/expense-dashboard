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

interface MonthlyTypeChartProps {
  expenses: ProcessedExpense[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];

const MonthlyTypeChart = ({ expenses }: MonthlyTypeChartProps) => {
  // Group expenses by month and type
  const monthMap = new Map<string, Record<string, number>>();
  
  expenses
    .filter((e) => e.type === 'Gasto')
    .forEach((expense) => {
      const monthKey = `${expense.date.getFullYear()}-${String(
        expense.date.getMonth() + 1
      ).padStart(2, '0')}`;
      
      if (!monthMap.has(monthKey)) {
        monthMap.set(monthKey, {});
      }
      
      const monthData = monthMap.get(monthKey)!;
      const category = expense.category || 'Sin categoría';
      monthData[category] = (monthData[category] || 0) + Math.abs(expense.amount);
    });

  // Get all unique categories
  const allCategories = new Set<string>();
  expenses
    .filter((e) => e.type === 'Gasto')
    .forEach((expense) => {
      allCategories.add(expense.category || 'Sin categoría');
    });

  // Convert to chart data format
  const chartData = Array.from(monthMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month,
      ...data,
    }));

  const categories = Array.from(allCategories).sort();

  return (
    <div className="chart-container">
      <h3>Gastos por Categoría - Tendencia Mensual</h3>
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
              stackId="a"
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTypeChart;
