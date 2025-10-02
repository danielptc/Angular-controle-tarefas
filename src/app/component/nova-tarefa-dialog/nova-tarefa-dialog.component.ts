import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nova-tarefa-dialog',
  templateUrl: './nova-tarefa-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
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
  cadastroTarefa: string = 'Cadastro de tarefa';

  constructor(
    public dialogRef: MatDialogRef<NovaTarefaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) {
    if (data) {
      this.novaTarefa = { ...data };
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  salvar(tarefaForm: any) {
    if (tarefaForm.invalid) {
      this.snackBar.open(
        'Por favor, preencha todos os campos obrigatórios.',
        'Fechar',
        { duration: 10000, panelClass: ['custom-snackbar-warning'] }
      );
      return;
    } else if (new Date(this.novaTarefa.dataPrevistaConclusao) < new Date()) {
      this.snackBar.open(
        'A data prevista de conclusão não pode ser anterior à data atual.',
        'Fechar',
        { panelClass: ['custom-snackbar-error'] }
      );
      return;
    } else {
      this.snackBar.open('Tarefa salva com sucesso!', 'Fechar', {
        duration: 3000,
        panelClass: ['custom-snackbar-success'],
      });
    }

    this.dialogRef.close(this.novaTarefa);
  }
}
