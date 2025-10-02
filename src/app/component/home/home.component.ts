import { Component } from '@angular/core';
import { TarefasComponent } from "../tarefas/tarefas.component";

@Component({
  selector: 'app-home',
  imports: [TarefasComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
