import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { CurrencyMaskModule } from "ng2-currency-mask";

import { Expense } from './../../interfaces/expense.interface';

import { ConsultationService } from '../../services/expenses/consultation.service';
import { DbService } from '../../services/db/db.service';
import { MatDialog } from '@angular/material/dialog';
import { EditExpenseComponent } from '../../components/forms/edit-expense/edit-expense.component';


@Component({
  selector: 'app-consultation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CurrencyMaskModule
  ],
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss'
})
export class ConsultationComponent implements OnInit {

  searchForm!: FormGroup;
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  editingExpenseId: number | null = null; //For in storage expense on editing
  iconSearch: string = 'assets/icons/search.svg';
  currentPage: number = 0;
  pageSize: number = 5;

  // Options to input "type"
  expenseTypes = [
    { value: 'food', label: 'food' },
    { value: 'education', label: 'education' },
    { value: 'leisure', label: 'leisure' },
    { value: 'health', label: 'health' },
    { value: 'transport', label: 'transport' },
  ];


  constructor(
    private fb: FormBuilder,
    private searchExpense: ConsultationService,
    private dbService: DbService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  private initForm(): void {
    this.searchForm = this.fb.group({
      date: [''],
      type: [''],
      description: [''],
      value: [''],
    });
  }
  private loadAllExpenses(): void {
    this.expenses = this.dbService.retrieveAllRecords();
    this.applyPagination();
  }

  ngOnInit(): void {
    this.initForm();
    //Ensures that code will only run in the browser
    if (typeof window !== 'undefined') {
      this.loadAllExpenses();
    }
  }

  applyPagination(): void{
    const startIndex = this.currentPage * this.pageSize;
    this.filteredExpenses = this.expenses.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.expenses.length) {
      this.currentPage++;
      this.applyPagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.applyPagination();
    }
  }

  searchExpenses(): void {
    const filters = this.searchForm.value;
    const hasFilters = Object.values(filters).some(value => value); // check if some input was filled

    if (!hasFilters) {
      this.loadAllExpenses(); // Return all expenses if there are no filters
      return;
    }

    this.expenses = this.searchExpense.search(filters);
    this.currentPage = 0; // reset page in search
    this.applyPagination();
  }

  removeExpense(id:number): void {
    this.dbService.remove(id);
    this.loadAllExpenses(); // Recharge expenses after removal
    this.snackBar.open('expense successfully removed!', 'Close', { duration: 2000 });
  }

  editExpense(expense: Expense): void {
    const dialogRef = this.dialog.open(EditExpenseComponent, {
      width: '400px',
      data: expense
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dbService.save(result, result.id); // update data in localstorage
        this.loadAllExpenses(); // Reload the list
        this.snackBar.open('Expense updated successfully!', 'X', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['custom-snackbar']
        });
      }
    });
  }

  saveExpense(): void {
    if (this.editingExpenseId !== null) {
      const updatedExpense: Expense = { id: this.editingExpenseId, ...this.searchForm.value };
      this.dbService.save(updatedExpense, this.editingExpenseId);
      this.editingExpenseId = null; // Reset the edition
      this.searchForm.reset();
      this.loadAllExpenses();
      this.snackBar.open('Expense updated successfully!', 'Close', { duration: 2000 });
    }
  }

  clearFilters(): void {
    this.searchForm.reset();
    this.loadAllExpenses();
    this.snackBar.open('Filters cleared!', 'Close', { duration: 2000 });
  }


}
