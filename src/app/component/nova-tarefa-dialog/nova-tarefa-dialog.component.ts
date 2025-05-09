import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nova-tarefa-dialog',
  templateUrl: './nova-tarefa-dialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}
  ],
})
export class NovaTarefaDialogComponent {
  novaTarefa = {
    nome: '',
    prioridade: 'BAIXA',
    dataPrevistaConclusao: '',
    descricao: '',
    situacao: 'ABERTA',
  };

  constructor(
    public dialogRef: MatDialogRef<NovaTarefaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.novaTarefa = { ...data }; // Preenche os campos com os dados da tarefa
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  salvar() {
    if (new Date(this.novaTarefa.dataPrevistaConclusao) < new Date()) {
      alert('A data prevista de conclusão não pode ser anterior à data atual.');
      return;
    }
    this.dialogRef.close(this.novaTarefa);
  }
}
