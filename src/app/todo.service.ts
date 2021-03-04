import { Injectable } from '@angular/core';
import { SQLiteService } from './services/sqlite.service';
import { Todoitem } from './todoitem';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  db:any;

  constructor(private _sqlite: SQLiteService) {   //belangrijk, zorg dat je de sqlite service injecteert, bekijkt dit als de bibliotheek die je nodig hebt om met sqlite te werken.
    this.initDb();
  }

  async initDb() {
    this.db = await this._sqlite.createConnection("todo", false, "no-encryption", 1);
    let ret: any = await this.db.open();
    const createTable= "CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY,description TEXT NOT NULL, priority TEXT NOT NULL)";
    ret = await this.db.execute(createTable);

  }

  async addItem(td: Todoitem){
    let sqlcmd: string = "INSERT INTO todo (description, priority) VALUES (?, ?)";
    let values: Array<any> = [td.description, td.priority];
    await this.db.run(sqlcmd, values);
  }

  async getItems() {
    let ret:any = await this.db.query("SELECT * FROM todo ORDER BY priority;");
    return ret.values;
  }

  async deleteItem(id: number){
    let ret: any = await this.db.query(`DELETE FROM todo WHERE id = ${id}`);
    return ret.values;
  }


}