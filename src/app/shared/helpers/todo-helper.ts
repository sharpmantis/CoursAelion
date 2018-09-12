import { MatTableHelper} from './mat-table-helper'

export class TodoHelper extends MatTableHelper {
   

    public constructor() {
        super()
        this.todoTableMap.set(
            'title',
            { title: 'A faire', always: true, value: 'title', isDisplayed: true }
        );
        this.todoTableMap.set(
            'debut',
            { title: 'De..', always: false, value: 'debut', isDisplayed: true }
        );
        this.todoTableMap.set(
            'fin',
            { title: 'A..', always: false, value: 'fin', isDisplayed: true }
        );
        this.todoTableMap.set(
            'update',
            { title: '', always: true, value: 'update', isDisplayed: true }
        );
        this.todoTableMap.set(
            'delete',
            { title: '', always: true, value: 'delete', isDisplayed: true }
        );
    }

   
}
