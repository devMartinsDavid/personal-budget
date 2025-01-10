import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UtilsModule } from '../../utils/utils.module';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    UtilsModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnChanges {
 @Input() fields: { key: string; label: string; type: string; required: boolean; options?: { value: string; label: string }[] }[] = [];  @Input() initialData: any = {}; // Dados iniciais para preencher o formulário
  @Input() submitLabel = 'Salvar'; // Rótulo do botão de envio
  @Output() submitForm = new EventEmitter<any>(); // Evento emitido ao enviar o formulário

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(): void {
    this.form = this.fb.group({});
    this.fields.forEach((field) => {
      this.form.addControl(
        field.key,
        this.fb.control(this.initialData[field.key] || '', field.required ? Validators.required : null)
      );
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = this.form.value;

      // Tratando o valor (remover a máscara e convertendo para número)
      if (formValue.valor) {
        formValue.valor = this.formatCurrency(formValue.valor);
      }

      // Tratando a data para o formato brasileiro (dd/MM/yyyy)
      if (formValue.date) {
        formValue.date = this.formatDate(formValue.date);
      }

      // Emitindo o formulário com os valores formatados
      this.submitForm.emit(formValue);
    }
  }

  formatCurrency(value: string): number {
    return parseFloat(value.replace(/[^\d,-]/g, '').replace(',', '.'));
  }

  // Função para formatar a data para o formato brasileiro (dd/MM/yyyy)
  formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
