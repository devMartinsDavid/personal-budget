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
    search(filters: Partial<Expense>): Expense[] {
      return this.getAll().filter(expense =>
        Object.keys(filters).every(key =>
          expense[key as keyof Expense]?.toString().includes(filters[key as keyof Expense]?.toString() || '')
        )
      );
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
        expense.id = i; // Adiciona o ID ao objeto de despesa
        expenses.push(expense);
      }
  
      console.log('Despesas recuperadas:', expenses);
      return expenses;
    }
}
