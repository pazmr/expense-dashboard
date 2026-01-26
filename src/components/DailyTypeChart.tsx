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

interface DailyTypeChartProps {
  expenses: ProcessedExpense[];
  selectedMonth?: string; // Format: YYYY-MM or 'all'
  months?: string[];
  onMonthChange?: (month: string) => void;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];

const DailyTypeChart = ({ expenses, selectedMonth = 'all', months = [], onMonthChange }: DailyTypeChartProps) => {
  // Filter expenses by selected month
  const filteredByMonth = expenses.filter((e) => {
    if (selectedMonth === 'all') return true;
    const monthKey = `${e.date.getFullYear()}-${String(
      e.date.getMonth() + 1
    ).padStart(2, '0')}`;
    return monthKey === selectedMonth;
  });

  // Group expenses by day and category
  const dayMap = new Map<string, Record<string, number>>();
  
  filteredByMonth
    .filter((e) => e.type === 'Gasto')
    .forEach((expense) => {
      const dayKey = expense.date.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      if (!dayMap.has(dayKey)) {
        dayMap.set(dayKey, {});
      }
      
      const dayData = dayMap.get(dayKey)!;
      const category = expense.category || 'Sin categoría';
      dayData[category] = (dayData[category] || 0) + Math.abs(expense.amount);
    });

  // Get all unique categories
  const allCategories = new Set<string>();
  filteredByMonth
    .filter((e) => e.type === 'Gasto')
    .forEach((expense) => {
      allCategories.add(expense.category || 'Sin categoría');
    });

  // Convert to chart data format
  const chartData = Array.from(dayMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([day, data]) => ({
      day,
      ...data,
    }));

  const categories = Array.from(allCategories).sort();

  return (
    <div className="chart-container">
      <h3>Gastos por Categoría - Tendencia Diaria</h3>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ fontWeight: 600 }}>
          Mes:
          <select
            value={selectedMonth}
            onChange={(e) => onMonthChange?.(e.target.value)}
            style={{ marginLeft: '0.5rem', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #ddd' }}
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m === 'all' ? 'Todos' : m}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(value) => value ? formatCurrency(value as number) : ''} />
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

export default DailyTypeChart;
