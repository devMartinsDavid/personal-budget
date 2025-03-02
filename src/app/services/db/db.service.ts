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

  grave(expense: Expense): void {
    const id = this.getNextId();
    localStorage.setItem(id.toString(), JSON.stringify(expense));
    localStorage.setItem('id', id.toString());
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
