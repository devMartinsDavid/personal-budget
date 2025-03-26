import { Injectable } from '@angular/core';
import { Expense } from '../../interfaces/expense.interface';
import { DbService } from './../db/db.service';
import { SumAllTypes } from '../../interfaces/sumAllTypes.interface'

@Injectable({
  providedIn: 'root'
})
export class SumExpensesService {

  expense: Expense[] = [];

  constructor(
    private dbService: DbService,
  ) { }

  getAllExpenses(): Expense[] {
    const expenses = this.dbService.retrieveAllRecords();
    return expenses;
  }

  sumByType(type: string): number {
    const expenses = this.getAllExpenses();
    const total = expenses
      .filter(expense => expense.type.toLowerCase() === type.toLowerCase())
      .reduce((sum, expense) => sum + expense.value, 0);

    return total;
  }

  sumAllTypes(): SumAllTypes {
    const expenses = this.getAllExpenses();
    const sumMap = new Map<string, number>();
    let totalAll = 0;

    expenses.forEach(expense => {
      const type = expense.type;
      sumMap.set(type, (sumMap.get(type) || 0) + expense.value);
      totalAll += expense.value;
    });

    const sumsByType = Array.from(sumMap.entries()).map(([type, total]) => ({ type, total }));

    return { sumsByType, totalAll };
  }

}
