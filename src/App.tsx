import { useState, useEffect, useMemo } from 'react';
import type { ProcessedExpense, DashboardStats } from './types/Expense';
import { loadExpensesFromCSV } from './utils/csvParser';
import { calculateDashboardStats } from './utils/dataProcessing';
import SummaryCard from './components/SummaryCard';
import CategoryChart from './components/CategoryChart';
import MonthlyTypeChart from './components/MonthlyTypeChart';
import DailyTypeChart from './components/DailyTypeChart';
import MonthlyIncomeChart from './components/MonthlyIncomeChart';
import ResponsibleChart from './components/ResponsibleChart';
import MonthlyTrendChart from './components/MonthlyTrendChart';
import ExpenseTable from './components/ExpenseTable';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState<ProcessedExpense[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [months, setMonths] = useState<string[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        console.log('Loading CSV data...');
        const data = await loadExpensesFromCSV(`${import.meta.env.BASE_URL}expenses.csv`);
        console.log('Data loaded:', data.length, 'records');
        setExpenses(data);
        const calculatedStats = calculateDashboardStats(data);
        console.log('Stats calculated:', calculatedStats);
        setStats(calculatedStats);

        const uniqueYears = Array.from(new Set(data.map((d) => d.date.getFullYear().toString()))).sort(
          (a, b) => b.localeCompare(a)
        );
        setYears(['all', ...uniqueYears]);
        if (uniqueYears.length) {
          setSelectedYear(uniqueYears[0]);
        }
      } catch (err) {
        setError('Error al cargar los datos del CSV: ' + (err as Error).message);
        console.error('CSV Loading Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  const filteredExpenses = useMemo(() => {
    if (selectedYear === 'all') return expenses;
    return expenses.filter((e) => e.date.getFullYear().toString() === selectedYear);
  }, [expenses, selectedYear]);

  // Update available months when year changes
  useMemo(() => {
    const uniqueMonths = Array.from(
      new Set(
        filteredExpenses.map(
          (d) =>
            `${d.date.getFullYear()}-${String(d.date.getMonth() + 1).padStart(
              2,
              '0'
            )}`
        )
      )
    ).sort((a, b) => b.localeCompare(a));
    setMonths(['all', ...uniqueMonths]);
    setSelectedMonth('all');
  }, [selectedYear, filteredExpenses]);

  const filteredStats = useMemo(() => {
    if (!stats) return null;
    return calculateDashboardStats(filteredExpenses);
  }, [stats, filteredExpenses]);

  if (!filteredStats) {
    return null;
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📊 Dashboard de Gastos</h1>
        <p>Análisis de Gastos e Ingresos</p>
      </header>

      <main className="app-main">
        <section className="filters-section" style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label style={{ color: '#fff', fontWeight: 600 }}>
            Año:
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{ marginLeft: '0.5rem', padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #ddd' }}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y === 'all' ? 'Todos' : y}
                </option>
              ))}
            </select>
          </label>
        </section>

        <section className="summary-section">
          <SummaryCard
            title="Total Ingresos"
            value={filteredStats.totalIncome}
            icon="💰"
            color="#4CAF50"
          />
          <SummaryCard
            title="Total Gastos"
            value={filteredStats.totalExpenses}
            icon="💸"
            color="#F44336"
          />
          <SummaryCard
            title="Saldo Actual"
            value={filteredStats.currentBalance}
            icon="💳"
            color="#2196F3"
          />
          <SummaryCard
            title="Transacciones"
            value={filteredStats.transactionCount}
            icon="📝"
            color="#FF9800"
          />
        </section>

        <section className="charts-section">
          <div className="chart-row">
            <CategoryChart data={filteredStats.categoryBreakdown} />
          </div>
          
          <div className="chart-row">
            <MonthlyTypeChart expenses={filteredExpenses} />
          </div>

          <div className="chart-row">
            <DailyTypeChart 
              expenses={filteredExpenses} 
              selectedMonth={selectedMonth}
              months={months}
              onMonthChange={setSelectedMonth}
            />
          </div>
          
          <div className="chart-row">
            <MonthlyIncomeChart expenses={filteredExpenses} />
            <MonthlyTrendChart data={filteredStats.monthlyTrends} />
          </div>

          <div className="chart-row">
            <ResponsibleChart data={filteredStats.responsibleBreakdown} />
          </div>
        </section>

        <section className="table-section">
          <ExpenseTable expenses={filteredExpenses} />
        </section>
      </main>
    </div>
  );
}

export default App;
