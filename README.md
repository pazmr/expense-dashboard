# 📊 Dashboard de Gastos - Expense Report Web App

Una aplicación web moderna para visualizar y analizar gastos e ingresos desde archivos CSV.

## 🚀 Características

### Resumen General
- **Total de Ingresos**: Suma de todos los ingresos registrados
- **Total de Gastos**: Suma de todos los gastos realizados
- **Saldo Actual**: Balance actual de la cuenta
- **Contador de Transacciones**: Número total de transacciones

### Visualizaciones
1. **Gastos por Categoría** - Gráfico circular mostrando la distribución de gastos por categoría
2. **Gastos por Tipo** - Gráfico de barras con gastos clasificados como Rutinario, Extra, o No rutinario
3. **Gastos por Responsable** - Distribución de gastos por persona (Max, Faby)
4. **Tendencia Mensual** - Gráfico de líneas mostrando la evolución de ingresos, gastos y balance neto a lo largo del tiempo

### Tabla de Transacciones
- Lista completa de todas las transacciones
- Filtrado por tipo (Gasto/Ingreso)
- Búsqueda por descripción, categoría o responsable
- Paginación (10 transacciones por página)

## 📋 Requisitos Previos

- Node.js (versión 16 o superior)
- npm (viene incluido con Node.js)

## 🛠️ Instalación

El proyecto ya está creado en: `D:\Fotos\WebappGastos\expense-dashboard`

Las dependencias ya están instaladas:
- React + TypeScript
- Vite (bundler)
- PapaParse (para leer CSV)
- Recharts (para gráficos)

## 🎯 Uso

### Iniciar el Servidor de Desarrollo

```bash
cd "D:\Fotos\WebappGastos\expense-dashboard"
npm run dev
```

El servidor se iniciará en: `http://localhost:5173/`

### Actualizar el Archivo CSV

1. Coloca tu archivo `expenses.csv` actualizado en la carpeta `public/`
2. Asegúrate de que tenga las siguientes columnas:
   - Fecha (formato: YYYYMMDD)
   - Hora
   - Descripción
   - Medio de Atención
   - Lugar
   - Monto
   - Saldo
   - Titulo (tipo: Rutinario, Extra, No rutinario)
   - Tipo (Gasto o Ingreso)
   - Categoria
   - Descripcion Adicional
   - Responsable

3. Recarga la página para ver los datos actualizados

## 📁 Estructura del Proyecto

```
expense-dashboard/
├── public/
│   └── expenses.csv          # Archivo CSV con los datos
├── src/
│   ├── components/           # Componentes React
│   │   ├── SummaryCard.tsx
│   │   ├── CategoryChart.tsx
│   │   ├── TypeChart.tsx
│   │   ├── ResponsibleChart.tsx
│   │   ├── MonthlyTrendChart.tsx
│   │   └── ExpenseTable.tsx
│   ├── types/
│   │   └── Expense.ts        # Definiciones de tipos TypeScript
│   ├── utils/
│   │   ├── csvParser.ts      # Lector de CSV
│   │   └── dataProcessing.ts # Procesamiento de datos
│   ├── App.tsx               # Componente principal
│   ├── App.css               # Estilos
│   └── main.tsx              # Punto de entrada
└── package.json
```

## 🔧 Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview del build de producción
npm run preview
```

## 🎨 Personalización

### Modificar Colores
Edita los colores en `src/App.css`:
- Gradiente de fondo: líneas `.app`
- Colores de gráficos: arrays `COLORS` en los componentes de gráficos

### Agregar Nuevos Reportes
1. Crea un nuevo componente en `src/components/`
2. Importa y usa en `App.tsx`
3. Agrega estilos necesarios en `App.css`

## 📊 Formato del CSV

Ejemplo de formato esperado:

```csv
Fecha,Hora,Descripción,Medio de Atención,Lugar,Monto,Saldo,Titulo,Tipo,Categoria,Descripcion Adicional,Responsable
20260102,13:22:20,Compra supermercado,Tarjeta,Supermercado Central,-150.50,"5,000.00",Gasto,Rutinario,Comida,Compra mensual,Max
20260105,00:00:00,Salario,Transferencia,Banco,3500.00,"8,500.00",Ingreso,Ingreso,Salario,,Max
```

## 🐛 Solución de Problemas

### El CSV no carga
- Verifica que el archivo esté en `public/expenses.csv`
- Confirma que el formato del CSV coincida con el esperado
- Revisa la consola del navegador (F12) para ver errores

### Los gráficos no se muestran
- Asegúrate de que haya datos en el CSV
- Verifica que las columnas tengan los nombres correctos

### Error al iniciar el servidor
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

## 🌐 Navegadores Compatibles

- Chrome (recomendado)
- Firefox
- Safari
- Edge

## 📝 Notas

- Los montos negativos en el CSV representan gastos
- Los montos positivos representan ingresos
- El formato de fecha debe ser YYYYMMDD (ej: 20260102 para 2 de enero de 2026)
- Los valores de montos pueden incluir comas como separador de miles

## 🎓 Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool
- **Recharts** - Gráficos interactivos
- **PapaParse** - Parser de CSV

---

## React + TypeScript + Vite

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
