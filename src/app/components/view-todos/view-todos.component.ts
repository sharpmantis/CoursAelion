import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../../shared/services/todo.service';
import { Subscription } from 'rxjs';
import { TodoInterface } from '../../shared/interfaces/todo-interface';
import { MatTableDataSource,MatPaginator,MatSort,} from '@angular/material'

@Component({
  selector: 'app-view-todos',
  templateUrl: './view-todos.component.html',
  styleUrls: ['./view-todos.component.css']
})



export class ViewTodosComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  //Abonnement a un todo qui viens de nulle part (pour l'instant)
  private todoSubsctiption: Subscription;

  //tableau des todos a afficher
  public todos: TodoInterface[];
  public todoForm: FormGroup;
  public column = new FormControl();



  public displayedColumns : String[]=[
    'title',
    'debut',
    'fin',
    'update',
    'delete'
  ];
  //Colones visibles dans mon select
  public availableColumns: String[]=[
    'debut',
    'fin',
  ];
  //Colonnes cochées par défaut
  public selectedValue: String[]=[
    'debut',
    'fin',
  ];
  public selectedOptions: any;

  public dataSource= new MatTableDataSource<TodoInterface>();

  constructor(private todoService: TodoService) {
    //a Ctrl+C Ctrl+V
    this.todos = [];

    this.todoSubsctiption = this.todoService.getTodo()
      .subscribe((todo) => {
        console.log('obserbable todo: ' + JSON.stringify(todo));
        //ajoute le todo a la liste des todos
        //s'il n'existe pas déja
        //attention, s'il existe, je dois le remplacer pas les nouvelles valeurs
        const index = this.todos.findIndex((obj) => obj.id == todo.id);
        if (index === -1 && todo.hasOwnProperty('id')) {
          this.todos.push(todo);
        } else {
          this.todos[index] = todo;
        }

      }

      );
      this.dataSource.data=this.todos;
  }
  /**
   * Après la construction de  l'objet, on charge la liste 
   * des todos existants dans la base
   */


  public saveTodo(): void {
    const _todo: TodoInterface = this.todoForm.value;
    _todo.isChecked = false;
    this.todoService.sendTodo(_todo);

  }

    public changeView(event:any):void{
    const toShow: String[] = this.selectedOptions;
    const toDisplay: String[] = [];

    toDisplay.push('title');

    if(toShow.indexOf('debut') !==-1){
      toDisplay.push('debut');
    }
    if(toShow.indexOf('fin') !== -1){
      toDisplay.push('fin');
    }
    toDisplay.push('update');
    toDisplay.push('delete');

    this.displayedColumns=toDisplay;
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      console.log('il y a ' + this.todos.length + ' todos a afficher dans ma liste');
      this.dataSource.data=this.todos;
      this.dataSource.sort=this.sort;
    });
  }

  public delete(todo: TodoInterface): void {
    const index = this.todos.indexOf(todo);
    const _todo = this.todos[index]; //recupere le todo
    this.todos.splice(index, 1); //dépile l'element du tableau
    this.todoService.deleteTodo(_todo); // j'appelle mon service
    this.dataSource.data=this.todos;
  }

  public checkedStatus: boolean = false;

  public toggle(index: number): void {
    this.todos[index].isChecked = !this.todos[index].isChecked;
    this.checkedStatus = this._allChecked()
  }

  private _allChecked(): boolean {
    let allChecked: boolean = true;
    for (const todo of this.todos) {
      if (!todo.isChecked) {
        allChecked = false
      }
    }
    return allChecked;
  }


  public hasNoneChecked(): Boolean {
    let status: Boolean = true;
    for (const todo of this.todos) {
      if (todo.isChecked) {
        status = false;
      }
    }
    return status;
  }

  /**
   * determine l'etat d'un todo checked ou pas
   */

  public isChecked(todo: TodoInterface): Boolean {
    return (todo.isChecked);
  }

  public checkUncheckall() {
    this.checkedStatus = !this.checkedStatus;

    this._check()

  }

  /**
   * change l'etat de tous les todos
   */

  private _check(): void {
    for (let index = 0; index < this.todos.length; index++) {

      this.todos[index].isChecked = this.checkedStatus;

    }
  }

  public deleteMultipleTwo() {
    const _todos: TodoInterface[] = [];

    for (let todo of this.todos) {
      if (!todo.isChecked) {
        _todos.push(todo);
      } else {
        this.todoService.deleteTodo(todo)
      }
    }
    this.todos = _todos;
  }

  public update(todo: TodoInterface): void {
    console.log("Modif du todo " + todo.id);
    this.todoService.sendTodo(todo);
  }



}
