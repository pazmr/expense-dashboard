import { formatCurrency } from '../utils/dataProcessing';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
}

const SummaryCard = ({ title, value, icon, color }: SummaryCardProps) => {
  return (
    <div className="summary-card" style={{ borderLeftColor: color }}>
      <div className="summary-card-header">
        <span className="summary-card-icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <div className="summary-card-value">{formatCurrency(value)}</div>
    </div>
  );
};

export default SummaryCard;
