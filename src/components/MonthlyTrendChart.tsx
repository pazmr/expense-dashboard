import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { MonthlySummary } from '../types/Expense';
import { formatCurrency } from '../utils/dataProcessing';

interface MonthlyTrendChartProps {
  data: MonthlySummary[];
}

const MonthlyTrendChart = ({ data }: MonthlyTrendChartProps) => {
  const chartData = data.map((item) => ({
    month: item.month,
    Ingresos: item.income,
    Gastos: item.expenses,
    Neto: item.net,
  }));

  return (
    <div className="chart-container">
      <h3>Tendencia Mensual</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
          <Line type="monotone" dataKey="Ingresos" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="Gastos" stroke="#ff7c7c" strokeWidth={2} />
          <Line type="monotone" dataKey="Neto" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendChart;
