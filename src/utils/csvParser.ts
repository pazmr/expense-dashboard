import Papa from 'papaparse';
import type { ProcessedExpense } from '../types/Expense';

export const loadExpensesFromCSV = async (filePath: string): Promise<ProcessedExpense[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<any>(filePath, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log('Raw CSV data:', results.data);
        console.log('First record:', results.data[0]);
        
        const processed = results.data.map((record: any): ProcessedExpense => {
          // Parse date (format: YYYYMMDD)
          const dateStr = record.Fecha;
          const year = parseInt(dateStr.substring(0, 4));
          const month = parseInt(dateStr.substring(4, 6)) - 1;
          const day = parseInt(dateStr.substring(6, 8));
          
          // Parse amount (remove commas and convert to number)
          const amount = parseFloat(record.Monto.replace(/,/g, ''));
          const balance = parseFloat(record.Saldo.replace(/,/g, ''));

          return {
            date: new Date(year, month, day),
            time: record.Hora,
            description: record['Descripción'] || record.Descripcion,
            paymentMethod: record['Medio de Atención'] || record.MedioDeAtencion,
            place: record.Lugar,
            amount: amount,
            balance: balance,
            title: record.Titulo,  // This is "Gasto" or "Ingreso"
            type: record.Titulo,    // We need to use Titulo, not Tipo!
            category: record.Categoria,
            additionalDescription: record['Descripcion Adicional'] || record.DescripcionAdicional || '',
            responsible: record.Responsable || '',
          };
        });

        console.log('Processed expenses:', processed);
        resolve(processed);
      },
      error: (error) => {
        console.error('CSV Parse Error:', error);
        reject(error);
      },
    });
  });
};
