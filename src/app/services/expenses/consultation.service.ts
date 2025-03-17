import { Injectable } from '@angular/core';
import { Expense } from './../../interfaces/expense.interface';
import { DbService } from '../db/db.service';


@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private dbService: DbService) { }

  search(filters: Partial<Expense>): Expense[] {
    const allRecords = this.dbService.retrieveAllRecords(); // Use o método do DbService

    return allRecords.filter(expense => {
      return Object.keys(filters).every(key => {
        const filterValue = filters[key as keyof Expense];
        const expenseValue = expense[key as keyof Expense];

        if (!filterValue) {
          return true;
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

}
