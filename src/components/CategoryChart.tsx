import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import type { CategorySummary } from '../types/Expense';
import { formatCurrency } from '../utils/dataProcessing';

interface CategoryChartProps {
  data: CategorySummary[];
}

const COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF8C42', '#A78BFA', '#EC4899'];

const CategoryChart = ({ data }: CategoryChartProps) => {
  const chartData = data.map((item, index) => ({
    name: item.name,
    value: item.total,
    fill: COLORS[index % COLORS.length],
  }));

  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, value, fill } = props;
    const percentage = ((value / chartData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1);

    return (
      <g>
        <rect x={x} y={y} width={width} height={height} style={{ fill, stroke: 'white', strokeWidth: 2 }} />
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize={12}
          fontWeight="bold"
          style={{
            pointerEvents: 'none',
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        >
          <tspan x={x + width / 2} dy={0}>
            {name}
          </tspan>
          <tspan x={x + width / 2} dy={16} fontSize={11} opacity={0.9}>
            {percentage}%
          </tspan>
          <tspan x={x + width / 2} dy={14} fontSize={10} opacity={0.85}>
            {formatCurrency(value)}
          </tspan>
        </text>
      </g>
    );
  };

  return (
    <div className="chart-container" style={{ gridColumn: '1 / -1', minHeight: '500px' }}>
      <h3>Gastos por Categoría</h3>
      <ResponsiveContainer width="100%" height={450}>
        <Treemap
          data={chartData}
          dataKey="value"
          stroke="#fff"
          fill="#8884d8"
          content={<CustomizedContent />}
        >
          <Tooltip
            formatter={(value: any) => formatCurrency(value)}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
