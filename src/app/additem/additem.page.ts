import { Todoitem } from './../todoitem';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {
  nieuwitem: Todoitem = new Todoitem();

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  close(){   //oproepen bij het klikken van het kruisje rechtsboven
    this.modalController.dismiss();
  }
  save(){   //oproepen bij het klikken op de knop
    this.modalController.dismiss(this.nieuwitem);   
    //dit geeft aan wat er terug moet komen bij een dismiss. Dat zal het item zijn dat je hebt aangepast via 2way binding/ngmodel
  }

}
