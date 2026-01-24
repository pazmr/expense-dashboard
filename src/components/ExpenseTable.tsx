import { useState, useMemo } from 'react';
import type { ProcessedExpense } from '../types/Expense';
import { formatCurrency, formatDate } from '../utils/dataProcessing';

interface ExpenseTableProps {
  expenses: ProcessedExpense[];
}

const ExpenseTable = ({ expenses }: ExpenseTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Gasto' | 'Ingreso'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  const filteredExpenses = useMemo(() => {
    const filtered = expenses.filter((expense) => {
      const matchesSearch =
        (expense.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (expense.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (expense.responsible || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === 'all' || expense.type === filterType;

      return matchesSearch && matchesType;
    });
    console.log('Filtered expenses:', filtered.length, 'from', expenses.length, 'total');
    return filtered;
  }, [expenses, searchTerm, filterType]);

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="expense-table-container">
      <h3>Lista de Transacciones</h3>
      
      <div className="table-filters">
        <input
          type="text"
          placeholder="Buscar por descripción, categoría o responsable..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />
        
        <select
          value={filterType}
          onChange={(e) => {
            setFilterType(e.target.value as 'all' | 'Gasto' | 'Ingreso');
            setCurrentPage(1);
          }}
          className="filter-select"
        >
          <option value="all">Todos</option>
          <option value="Gasto">Gastos</option>
          <option value="Ingreso">Ingresos</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Responsable</th>
            </tr>
          </thead>
          <tbody>
            {paginatedExpenses.map((expense, index) => (
              <tr key={index}>
                <td data-label="Fecha">{formatDate(expense.date)}</td>
                <td data-label="Tipo">
                  <span className={`badge badge-${expense.type === 'Ingreso' ? 'income' : 'expense'}`}>
                    {expense.type}
                  </span>
                </td>
                <td data-label="Categoría">{expense.category}</td>
                <td data-label="Descripción">{expense.description}</td>
                <td data-label="Monto" className={expense.type === 'Ingreso' ? 'income-amount' : 'expense-amount'}>
                  {formatCurrency(Math.abs(expense.amount))}
                </td>
                <td data-label="Responsable">{expense.responsible || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Anterior
        </button>
        <span className="pagination-info">
          Página {currentPage} de {totalPages} ({filteredExpenses.length} transacciones)
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ExpenseTable;
