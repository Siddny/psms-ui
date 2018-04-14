import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  camera_details: any[]=[]
  detail_list: any
  my_list: any[]=[]
  id: any

  displayedColumns = ['name', 'model', 'date_added', 'status'];
  dataSource: any;

  constructor(
  	private _services: ServiceService,
  	private route: ActivatedRoute,
  	) { }

  ngOnInit() {

	this.detail_list = this.route.params.subscribe(params=>{
		this.id = params['id']
    	console.log(this.id)
		this._services.getCameraDetails(this.id).subscribe(data=>{
			this.my_list = data
			console.log(this.my_list)
    		this.dataSource = new MatTableDataSource <Element>(this.my_list)
		})
	})
  }

}
