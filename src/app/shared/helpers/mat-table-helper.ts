import { MatColumns } from './../interfaces/mat-columns'


export class MatTableHelper {
    protected todoTableMap: Map<String, MatColumns> = new Map();

     //retourne le tableau des colonnes a afficher a partir du map defini
     public getDisplayColumns(): String[] {
        const toDisplay: String[] = [];

        this.todoTableMap.forEach((column, key) => {
            if (column.isDisplayed) {
                toDisplay.push(column.value);
            }
        });
        return toDisplay;
    }
    public getColumn(key: String): MatColumns {
        return this.todoTableMap.get(key);
    }

    public getOptionalColumns(): MatColumns[] {
        const toDisplay: MatColumns[] = [];

        this.todoTableMap.forEach((column, keys) => {
            if (!column.always) {
                toDisplay.push(column);
            }
        });
        return toDisplay;


    }
    public setDisplayedColumns(userSelection: String[]): String[] {
        this.todoTableMap.forEach((column, key) => {
            if (!column.always) {
                if (userSelection.indexOf(column.value) === -1) {
                    column.isDisplayed = false;
                } else {
                    column.isDisplayed = true;
                }
                this.todoTableMap.set(key, column);
            }
        });
        return this.getDisplayColumns();

    }

    public optionalColumnsToArray(): String[]{
        const toDisplay:String[] = [];

        this.todoTableMap.forEach((column, keys)=>{
            if(!column.always){
                toDisplay.push(column.value);
            }
        });
    return toDisplay;
    }
}
