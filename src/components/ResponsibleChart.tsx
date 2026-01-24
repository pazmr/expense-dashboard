import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { ResponsibleSummary } from '../types/Expense';
import { formatCurrency } from '../utils/dataProcessing';

interface ResponsibleChartProps {
  data: ResponsibleSummary[];
}

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

const ResponsibleChart = ({ data }: ResponsibleChartProps) => {
  const chartData = data.map((item) => ({
    name: item.name,
    value: item.total,
  }));

  return (
    <div className="chart-container">
      <h3>Gastos por Responsable</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => `${entry.name}: ${formatCurrency(entry.value)}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResponsibleChart;
