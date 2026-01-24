export interface ExpenseRecord {
  Fecha: string;
  Hora: string;
  Descripcion: string;
  MedioDeAtencion: string;
  Lugar: string;
  Monto: string;
  Saldo: string;
  Titulo: string;
  Tipo: 'Gasto' | 'Ingreso';
  Categoria: string;
  DescripcionAdicional: string;
  Responsable: string;
}

export interface ProcessedExpense {
  date: Date;
  time: string;
  description: string;
  paymentMethod: string;
  place: string;
  amount: number;
  balance: number;
  title: string;
  type: 'Gasto' | 'Ingreso';
  category: string;
  additionalDescription: string;
  responsible: string;
}

export interface CategorySummary {
  name: string;
  total: number;
  count: number;
}

export interface TypeSummary {
  name: string;
  total: number;
  count: number;
}

export interface ResponsibleSummary {
  name: string;
  total: number;
  count: number;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

export interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  currentBalance: number;
  transactionCount: number;
  categoryBreakdown: CategorySummary[];
  typeBreakdown: TypeSummary[];
  responsibleBreakdown: ResponsibleSummary[];
  monthlyTrends: MonthlySummary[];
}
