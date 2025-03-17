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
  hasExpenses: boolean = false;

  constructor(private sumService: SumExpensesService) {}

  ngOnInit(): void {
    this.sumAllExpenses();
  }

  sumExpensesByType(event: Event): void {
    this.selectedType = (event.target as HTMLSelectElement).value;

    if (this.selectedType) {
      this.total = this.sumService.sumByType(this.selectedType);
      this.allTotals = [];
    } else {
      this.sumAllExpenses();
    }
  }

  sumAllExpenses(): void {
    const result = this.sumService.sumAllTypes();
    this.allTotals = result.sumsByType;
    this.total = result.totalAll;
  }

  resetTable(): void {
    this.selectedType = '';
    this.sumAllExpenses();
  }
}
