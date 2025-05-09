import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { TarefasService } from './../../services/tarefas.service';
import { MatDialog } from '@angular/material/dialog';
import { NovaTarefaDialogComponent } from '../nova-tarefa-dialog/nova-tarefa-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    FormsModule,
  ],
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css'],
})
export class TarefasComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'prioridade', 'situacao', 'acoes'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private tarefasService: TarefasService) {}

  ngOnInit() {
    this.buscarListaTarefas();
  }

  buscarListaTarefas() {
    this.tarefasService.getDados().subscribe((dados) => {
      this.dataSource.data = dados;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarTarefa(tarefa: any) {
    const dialogRef = this.dialog.open(NovaTarefaDialogComponent, {
      width: '400px',
      data: { ...tarefa }, // Passa os dados da tarefa para o dialog
    });

    dialogRef.afterClosed().subscribe((tarefaEditada) => {
      if (tarefaEditada) {
        this.tarefasService.putDados(tarefaEditada.id, tarefaEditada).subscribe(() => {
          this.buscarListaTarefas();
        });
      }
    });
  }

  excluirTarefa(tarefa: any) {
    if (confirm(`Tem certeza de que deseja excluir a tarefa "${tarefa.nome}"?`)) {
      this.tarefasService.deleteTarefa(tarefa.id).subscribe(() => {
        this.buscarListaTarefas(); 
      });
    }
  }

  marcarComoConcluida(tarefa: any) {
    tarefa.situacao = 'CONCLUÍDA';
  }

  marcarComoPendente(tarefa: any) {
    tarefa.situacao = 'PENDENTE';
  }

  abrirDialogNovaTarefa() {
    const dialogRef = this.dialog.open(NovaTarefaDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((novaTarefa) => {
      if (novaTarefa) {
        this.tarefasService.postDados(novaTarefa).subscribe(() => {
          this.buscarListaTarefas(); 
        });
      }
    });
  }
}


