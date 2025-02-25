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

// import { UtilsModule } from '../../../utils/utils.module';
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
    private dbService: DbService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.expenseForm = this.fb.group({
      date: ['', Validators.required], // Campo de data obrigatório
      type: ['', Validators.required], // Campo de seleção obrigatório
      description: ['', Validators.required], // Campo de texto obrigatório
      value: ['', [Validators.required]], // Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  onSubmit(): void {
    if (this.expenseForm.valid) {
      const rawValue = this.expenseForm.get('value')?.value; // Pega o valor bruto (sem formatação)
      const expense: Expense = {
        ...this.expenseForm.value,
        value: parseFloat(rawValue),

      };
      this.dbService.grave(expense); // Salva no serviço
      this.expenseForm.reset(); // Limpa o formulário
      this.snackBar.open('Despesa salva com sucesso!', 'Fechar', {
        duration: 5000,
      });
    } else {
      this.snackBar.open('Erro ao salvar. Verifique os campos obrigatórios.', 'Fechar', {
        duration: 5000,
      });
    }
  }
}
