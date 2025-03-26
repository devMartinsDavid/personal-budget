import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DbService } from './../../../services/db/db.service';
import { Expense } from './../../../interfaces/expense.interface';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { CurrencyMaskModule } from "ng2-currency-mask";

@Component({
  selector: 'app-expense-form',
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
  providers: [CurrencyMaskModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent implements OnInit {
  expenseForm!: FormGroup;

  // Options for input "type"
  expenseTypes = [
    { value: 'food', label: 'Food' },
    { value: 'education', label: 'Education' },
    { value: 'leisure', label: 'Leisure' },
    { value: 'health', label: 'Health' },
    { value: 'transport', label: 'Transport' },
  ];

  constructor(
    private fb: FormBuilder,
    private dbService: DbService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void { this.initForm(); }

  private initForm(): void {
    this.expenseForm = this.fb.group({
      date: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      value: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const rawValue = this.expenseForm.get('value')?.value;
      const expense: Expense = {
        ...this.expenseForm.value,
        value: parseFloat(rawValue),

      };
      this.dbService.save(expense);
      this.expenseForm.reset();
      this.snackBar.open('Expense successfully saved!', 'X', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: ['custom-snackbar']
      });
    } else {
      this.snackBar.open('Error saving. Please check the required fields.', 'X', {
        duration: 5000,
      });
    }
  }
}
