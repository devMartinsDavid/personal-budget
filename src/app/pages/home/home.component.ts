import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { DbService } from '../../services/db/db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Campos do formulário
  fields = [
    { key: 'date', label: 'Data', type: 'date', required: true },
    {
      key: 'type',
      label: 'Tipo',
      type: 'select',
      required: true,
      options: [
        { value: '', label: 'Selecione o tipo' },
        { value: '1', label: 'Alimentação' },
        { value: '2', label: 'Educação' },
        { value: '3', label: 'Lazer' },
        { value: '4', label: 'Saúde' },
        { value: '5', label: 'Transporte' },
      ],
    },
    { key: 'description', label: 'Descrição', type: 'text', required: true },
    { key: 'valor', label: 'Valor R$', type: 'text', required: true }
  ];

  // Dados do formulário
  form!: FormGroup;

  constructor(private fb: FormBuilder, private dbService: DbService) {}

  ngOnInit(): void {
    // Inicializando o formulário com o FormBuilder
    this.form = this.fb.group({});
    this.fields.forEach((field) => {
      this.form.addControl(
        field.key,
        this.fb.control('', field.required ? Validators.required : null)
      );
    });
  }

  // Método para capturar o envio do formulário
  onSubmitForm(formValue: any): void {
    if (this.form.valid) {
      const expense = formValue;
      this.dbService.grave(expense);
      console.log('Despesa salva:', expense);
      this.form.reset();
    } else {
      console.log('Formulário inválido');
    }
  }
}
