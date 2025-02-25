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

  // search(filters: Partial<Expense>): Expense[] {
  //   const allRecords = this.retrieveAllRecords();
  //   return allRecords.filter(expense => {
  //     return Object.keys(filters).every(
  //       key => expense[key as keyof Expense] === filters[key as keyof Expense] || filters[key as keyof Expense] === ''
  //     );
  //   });
  // }

  remove(id: number): void {
    localStorage.removeItem(id.toString());
  }
}
