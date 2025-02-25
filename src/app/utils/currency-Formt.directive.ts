import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyFormat]',
})
export class CurrencyFormatDirective {

  constructor(private el: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event'])

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    let value = input.value.replace(/\D/g, ''); // Remove tudo que não for número

    //garante que o valor não fique vazio
    if (!value) {
      value = '0';
    }

    const formattedValue = this.formatCurrency(value); // Formata o valor

    input.value = formattedValue; // define o valor formatado no input

    // const numericValue = Number(value) / 100;
    // Atualiza o valor no FormControl (sem formatação)
    this.control.control?.setValue(parseFloat((Number(formattedValue) / 100).toFixed(2)), { emitEvent: false });

  }

  private formatCurrency(value: string): string {
    // Converte o valor para número e divide por 100 para obter o valor em reais
    const numberValue = Number(value) / 100;

    // Formata o valor como moeda brasileira (R$)
    return numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
