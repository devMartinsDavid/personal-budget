import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Expense } from '../../interfaces/expense.interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

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

    // check (client-side)
    if (isPlatformBrowser(this.platformId)) {
      const id = localStorage.getItem('id');
      const maxId = id ? parseInt(id, 10) : 0;

      for (let i = 1; i <= maxId; i++) {
        const expense = JSON.parse(localStorage.getItem(i.toString()) || 'null') as Expense;

        if (expense === null) { continue; }

        expense.id = i;
        expenses.push(expense);
      }

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
