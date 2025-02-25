import { ConsultationService } from './../../services/expenses/consultation.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { CurrencyMaskModule } from "ng2-currency-mask";

import { ConsultationService } from '../../services/expenses/consultation.service';


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

  // Opções para o campo "type"
  expenseTypes = [
    { value: 'alimentação', label: 'Alimentação' },
    { value: 'educação', label: 'Educação' },
    { value: 'lazer', label: 'Lazer' },
    { value: 'saúde', label: 'Saúde' },
    { value: 'transporte', label: 'Transporte' },
  ];

  private initForm(): void {
    this.searchForm = this.fb.group({
      date: [''], // Campo de data obrigatório
      type: [''], // Campo de seleção obrigatório
      description: [''], // Campo de texto obrigatório
      value: [''], // Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }
  private loadExpenses(): void {
    loadExpenses(): void {
      this.expenses = this.searchExpense.retrieveAllRecords();
    }
  }

  constructor(
    private fb: FormBuilder,
    private searchExpense: ConsultationService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadExpenses();
  }
  onSubmit() {

    if (this.searchForm.valid) { console.log(this.searchForm.value); }
    // Aqui você pode adicionar a lógica para salvar os dados ou enviar para o backend
    else { console.log('Formulário inválido!'); }

  }


}
