import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TypeSummary } from '../types/Expense';
import { formatCurrency } from '../utils/dataProcessing';

interface TypeChartProps {
  data: TypeSummary[];
}

const TypeChart = ({ data }: TypeChartProps) => {
  const chartData = data.map((item) => ({
    name: item.name,
    total: item.total,
    count: item.count,
  }));

  return (
    <div className="chart-container">
      <h3>Gastos por Tipo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => value ? formatCurrency(value as number) : ''} />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" name="Total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TypeChart;
