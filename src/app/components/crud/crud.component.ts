import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {
  @Input() items: T[] = []; // Lista de itens para exibição
  @Input() columns: { key: keyof T; label: string }[] = []; // Colunas a exibir
  @Input() entityName = ''; // Nome da entidade (ex: "Despesa")
  @Output() create = new EventEmitter<T>(); // Evento para criação
  @Output() update = new EventEmitter<T>(); // Evento para edição
  @Output() delete = new EventEmitter<number>(); // Evento para exclusão]

  selectedItem: T | null = null; // Item selecionado para edição

  constructor(){}

  ngOnInit(): void {}

  onAdd(): void {
    this.selectedItem = null; // Limpa o formulário
  }

  onEdit(item: T): void {
    this.selectedItem = { ...item }; // Preenche o formulário com o item selecionado
  }

  onSave(item: T): void {
    if ((item as any).id) {
      this.update.emit(item); // Atualizar item
    } else {
      this.create.emit(item); // Criar novo item
    }
    this.selectedItem = null; // Limpa o formulário
  }

  onDelete(id: number): void {
    this.delete.emit(id); // Emitir evento de exclusão
  }

}
