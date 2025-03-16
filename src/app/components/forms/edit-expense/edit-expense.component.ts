import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Expense } from './../../../interfaces/expense.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule

  ],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.scss'
})
export class EditExpenseComponent {
  editForm: FormGroup;

  expenseTypes = [
    { value: 'food', label: 'food' },
    { value: 'education', label: 'education' },
    { value: 'leisure', label: 'leisure' },
    { value: 'health', label: 'health' },
    { value: 'transport', label: 'transport' },
  ];

  constructor( private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Expense ) {
    this.editForm = this.fb.group({
      date: [data?.date || ''],
      type: [data?.type || ''],
      description: [data?.description || ''],
      value: [data?.value || ''],
    });
  }

  save(): void {
    if (this.editForm.valid) {
      this.dialogRef.close({ ...this.data, ...this.editForm.value }); //return data edited
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  getExpenseTypeLabel(): string {
    const selectedType = this.expenseTypes.find(option => option.value === this.editForm.value.type);
    return selectedType ? selectedType.label : 'Selecione um tipo';
  }
}
