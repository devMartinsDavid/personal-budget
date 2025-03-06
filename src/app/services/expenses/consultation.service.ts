import { Injectable } from '@angular/core';
import { Expense } from './../../interfaces/expense.interface';


@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor() { }

  /**
     * Busca despesas com base em filtros.
     * @param filters Objeto com os campos e valores para filtrar.
     * @returns Array de despesas que correspondem aos filtros.
     */
  /**
* Realiza uma busca de despesas com base nos filtros fornecidos.
*/
search(filters: Partial<Expense>): Expense[] {
  const allRecords = this.retrieveAllRecords();

  return allRecords.filter(expense => {
    return Object.keys(filters).every(key => {
      const filterValue = filters[key as keyof Expense];
      const expenseValue = expense[key as keyof Expense];

      if (!filterValue) {
        return true; // Se o filtro estiver vazio, mantém o registro
      }

      if (key === 'date') {

        const filterDate = new Date(filterValue as string).toISOString().split('T')[0];
        const expenseDate = new Date(expenseValue as string).toISOString().split('T')[0];

        return filterDate === expenseDate;
      }

      if (typeof filterValue === 'string') {
        return (expenseValue as string).toLowerCase().includes(filterValue.toLowerCase());
      }

      return expenseValue === filterValue;
      });
    });
  }

  retrieveAllRecords(): Expense[] {
    const expenses: Expense[] = [];
    const id = localStorage.getItem('id');
    const maxId = id ? parseInt(id, 10) : 0;

    for (let i = 1; i <= maxId; i++) {
      const expense = JSON.parse(localStorage.getItem(i.toString()) || 'null') as Expense;
      if (expense === null) {
        continue;
      }
      expense.id = i;
      expenses.push(expense);
    }

    console.log('Despesas recuperadas:', expenses);
    return expenses;
  }
}
