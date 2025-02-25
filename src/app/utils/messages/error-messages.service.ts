import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessagesService {

  constructor() { }

  getErrorMessage(field: string, error: string): string {
    const messages: { [key: string]: string } = {
      required: `${field} é obrigatório.`,
      pattern: `${field} está em um formato inválido.`,
    };
    return messages[error] || 'Erro desconhecido.';
  }

}
