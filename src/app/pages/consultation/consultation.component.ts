import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  iconSearch: string = 'assets/icons/search.svg';
  currentPage: number = 0;
  pageSize: number = 5;

  // Opções para o campo "type"
  expenseTypes = [
    { value: 'alimentação', label: 'Alimentação' },
    { value: 'educação', label: 'Educação' },
    { value: 'lazer', label: 'Lazer' },
    { value: 'saúde', label: 'Saúde' },
    { value: 'transporte', label: 'Transporte' },
  ];


  constructor(
    private fb: FormBuilder,
    private searchExpense: ConsultationService,
    private dbService: DbService,
    private snackBar: MatSnackBar
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
    this.expenses = this.searchExpense.retrieveAllRecords();
    this.applyPagination();
  }

  ngOnInit(): void {
    this.initForm();
    // Garante que o código só será executado no navegador
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
    const hasFilters = Object.values(filters).some(value => value); // Verifica se algum campo foi preenchido

    if (!hasFilters) {
      this.loadAllExpenses(); // Retorna todas as despesas se não houver filtros
      return;
    }

    this.expenses = this.searchExpense.search(filters);
    this.currentPage = 0; // Reseta a página ao buscar
    this.applyPagination();
  }

  removeExpense(id:number): void {
    this.dbService.remove(id);
    this.loadAllExpenses(); // Recarrega as despesas após a remoção
    this.snackBar.open('Despesa removida com sucesso!', 'Fechar', { duration: 2000 });
  }


}
