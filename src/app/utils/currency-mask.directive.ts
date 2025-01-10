import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyMask]',
})
export class CurrencyMaskDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    let value = this.el.nativeElement.value;

    // Remove tudo que não for número
    value = value.replace(/\D/g, '');

    // Adiciona a máscara de moeda
    if (value.length > 2) {
      value = value.replace(/(\d)(\d{2})$/, '$1,$2'); // Adiciona a vírgula para os centavos
      value = value.replace(/(?=(\d{3})+(\D))\B/g, '.'); // Adiciona o ponto como separador de milhar
    } else {
      value = value.replace(/^(\d*)$/, '$1'); // Para valores menores que 1 real
    }

    // Atualiza o valor do campo com a máscara aplicada
    this.el.nativeElement.value = value;
  }
}
