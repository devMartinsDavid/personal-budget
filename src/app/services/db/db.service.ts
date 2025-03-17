import { Injectable } from '@angular/core';
import { Expense } from '../../interfaces/expense.interface';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }
  getNextId(): number {
    const nextId = localStorage.getItem('id');
    return nextId ? parseInt(nextId, 10) + 1 : 1;
  }

  save(expense: Expense, id?: number): void {
    const expenseId = id ??  this.getNextId();
    localStorage.setItem(expenseId.toString(), JSON.stringify(expense));
    localStorage.setItem('id', Math.max(expenseId, parseInt(localStorage.getItem('id') || '0', 10)).toString());
  }

  retrieveAllRecords(): Expense[] {
    const expenses: Expense[] = [];

    if (typeof window !== 'undefined' && window.localStorage) {
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
    } else {
      console.warn('localStorage não está disponível ou não foi carregado corretamente');
    }

    return expenses;
  }


  search(filters: Partial<Expense>): Expense[] {
    const allRecords = this.retrieveAllRecords();
    return allRecords.filter(expense => {
      return Object.keys(filters).every(
        key => expense[key as keyof Expense] === filters[key as keyof Expense] || filters[key as keyof Expense] === ''
      );
    });
  }

  remove(id: number): void {
    localStorage.removeItem(id.toString());
  }
}
