import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipmentsService } from '../../services/equipments/equipments.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {

  new_ept: Equipment = new Equipment();
  ept_list: any[]=[];

  constructor(
    private _eqtServices: EquipmentsService,
  	) { }

  ngOnInit() {
  	this.getEqt();
  }

  newEqt(){
  	console.log(this.new_ept)
  	this._eqtServices.newItem(this.new_ept).subscribe(data=>{
  		this.new_ept = new Equipment();
  	})
  }

  getEqt(){
  	this._eqtServices.getItems().subscribe(data=>{
  		this.ept_list = data;
  		console.log(data);
  	})
  }
}

export class Equipment{
	name:any;
	details:any;
	model:any;
	serial_number:any;
}