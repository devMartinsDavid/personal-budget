import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SumExpensesService } from '../../services/expenses/sum-expenses.service';

@Component({
  selector: 'app-sum',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: [],
  templateUrl: './sum.component.html',
  styleUrl: './sum.component.scss'
})
export class SumComponent {
  total: number = 0;
  allTotals: { type: string, total: number }[] = [];
  selectedType: string = ''
  message: string = '';

  constructor(private sumService: SumExpensesService) {}

  ngOnInit(): void {
    this.sumAllExpenses();
  }

  sumExpensesByType(event: Event): void {
    this.selectedType = (event.target as HTMLSelectElement).value;

    if (this.selectedType) {
      // If a type is selected, we check if there are any expenses of that type
      this.total = this.sumService.sumByType(this.selectedType);
      this.allTotals = this.total > 0 ? [{ type: this.selectedType, total: this.total }] : [];
      this.message = this.total > 0 ? '' : 'No expenses found for this category.';
    } else {
      this.sumAllExpenses();
    }
  }

  sumAllExpenses(): void {
    const result = this.sumService.sumAllTypes();
    this.allTotals = result.sumsByType;
    this.total = result.totalAll;
    this.message = this.allTotals.length === 0 && this.total === 0 ? 'No expenses registered yet to be summed.' : '';
  }

  resetTable(): void {
    this.selectedType = '';
    this.sumAllExpenses();
  }
}
