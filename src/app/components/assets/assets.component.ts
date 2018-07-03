import { Component, OnInit } from '@angular/core';
import { AssetsService } from '../../services/assets/assets.service';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.css']
})

export class AssetsComponent implements OnInit {

  new_emp : Employee = new Employee();
  emp_dataSource: any;
  emp_list: any[]=[];
  emp_displayedColumns = ['name', 'phone_number', 'email', 'id_number', 'department', 'designation'];

  new_eq : Equipment = new Equipment();
  eq_dataSource: any;
  eq_list: any[]=[];
  eq_displayedColumns = ['label', '_type', 'brand', 'model', 'status', 'serial_number']; 
  
  eq_options = new FormControl();

  new_assign: Assign = new Assign();
  assign_list: any[]=[];

  assign_emp: any={};
  assign_eq: any[]=[];

  constructor(private _assetService: AssetsService) { }

  ngOnInit() {
  	this.getEmployees();
  	this.getEquipment();
  	this.getAssign();
  }

  newEmployee(){
  	console.log(this.new_emp);
  	this._assetService.newEmployee(this.new_emp).subscribe(data=>{
  		this.new_emp = new Employee();
  		this.getEmployees();
  	})
  }

  getEmployees(){
  	this._assetService.getEmployees().subscribe(data=>{
  		console.log(data);
  		this.emp_list = data;
  		this.emp_dataSource = new MatTableDataSource <Element>(data);
  	})
  }

  newEquipment(){
  	console.log(this.new_eq);
  	this._assetService.newEquipment(this.new_eq).subscribe(data=>{
  		this.new_eq = new Equipment();
  		this.getEquipment();
  	})
  }

  getEquipment(){
  	this._assetService.getEquipment().subscribe(data=>{
  		console.log(data);
  		this.eq_list = data;
  		this.eq_dataSource = new MatTableDataSource <Element>(data);
  	})
  }

  newAssign(){
  	console.log(this.new_assign);
    // this.new_assign['availability'] = 'book';
  	this._assetService.newAssign(this.new_assign).subscribe(data=>{
  		this.new_assign = new Assign();
  		this.getAssign();
  	})
  }


  getAssign(){
    this._assetService.getAssign().subscribe(data=>{
      this.assign_list = data;
      console.log(this.assign_list);
    })
  }

  // json server's
  // getAssign(){
  // 	this._assetService.getAssign().subscribe(data=>{

  // 		console.log(data);
  // 		for(let i of data){
  // 			console.log(i);	
  // 			for(let j of this.emp_list){
  // 				if(i.emp_ == j.id){
		//   			this.assign_eq = [];
  // 					this.assign_emp = j;
  // 					// console.log(this.assign_emp);

		//   			for(let x of i.eq_){
		//   				// console.log(x);
		//   				for(let k of this.eq_list){
		//   					if(x == k.id){
		// 	  					// console.log(k);
		// 	  					this.assign_eq.push(k);
		// 	  				}
		//   				}
		//   			}
		//   			console.log(this.assign_eq);
  // 				}
  // 			}
	 //  		var assign = {
	 //  			employee: this.assign_emp,
	 //  			equipments: this.assign_eq,
	 //  		}
  // 			this.assign_list.push(assign);
  // 		}
  // 		console.log(this.assign_list);
  // 	})
  // }

}

export class Employee{
	first_name: any;
	last_name: any;
	id_number: any;
  email: any;
  phone_number: any;
	designation:any;
	department: any;
}

export class Equipment{
	label: any;
	brand: any;
	model: any;
	status: any;
	serial_number: any;
  _type: any;
}

export class Assign{
	employee: any;
	tools: any;
  availability: any;
}
