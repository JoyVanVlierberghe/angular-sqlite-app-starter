import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdditemPage } from '../additem/additem.page';
import { DetailService } from '../services/detail.service';
import { SQLiteService } from '../services/sqlite.service';
import { TodoService } from '../todo.service';
import { Todoitem } from '../todoitem';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public exConn: boolean;
  public exJson: boolean
  public todos: Todoitem[] = [];

  constructor(private todoService: TodoService, private _detailService: DetailService, private _sqlite: SQLiteService, private modalController: ModalController) {
  }

  async ionViewWillEnter() {
    
      // this.exConn = this._detailService.getExistingConnection();
      // this.exJson = this._detailService.getExportJson();
      // console.log("**** ionViewWillEnter " + this.exConn);

      this.exConn = this._detailService.getExistingConnection();
      this.exJson = this._detailService.getExportJson();
      console.log("**** ionViewWillEnter " + this.exConn);
      this.todos = await this.todoService.getItems();

  }

//   async testDb(){
      
//     // verbinding maken - indien DB niet bestaat, dan wordt ze aangemaakt
//     // todo = naam van de databank
//     this.db = await this._sqlite.createConnection("todo", false, "no-encryption", 1);
//     let ret: any = await this.db.open();
     
//     //CREATE TABLES - SCHEMA MAKEN (IF NOT EXISTS => HIERDOOR BIJ EEN 2DE RUN GEEN FOUTEN)
//     const createTable= "CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY,description TEXT_type NOT NULL)";
//     ret = await this.db.execute(createTable);

   
//     //VOORBEELD VAN EEN INSERT
//     let sqlcmd: string = "INSERT INTO todo (description) VALUES (?)";
//     let values: Array<any> = ["testitem"];
//     await this.db.run(sqlcmd, values);

//     //VOORBEELD VAN EEN SELECT => de resultaten komen in de property met todo terecht
//     ret = await this.db.query("SELECT * FROM todo;");
//     this.todos = ret.values;
// }

async addItem(){

  let modal = await this.modalController.create({
    component: AdditemPage,
    cssClass: 'my-custom-class'
  });

  await modal.present();
  const{ data } = await modal.onDidDismiss();   //destruct. assignment - hier komt het item terug

  if(data){  
    this.todoService.addItem(data);   //we zetten het enkel nog maar in de array, dit gaat nog niet naar de db.
  }

  this.todos = await this.todoService.getItems();
}

async delete(id: number){
  this.todoService.deleteItem(id);
  this.todos = await this.todoService.getItems();
}


}
