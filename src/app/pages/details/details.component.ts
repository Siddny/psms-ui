import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

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


  displayedColumns = ['name', 'model', 'p_serial_number', 'date_added', 'status'];
  dataSource: any;

  constructor(
  	private _services: ServiceService,
  	private route: ActivatedRoute,
    public dialog: MatDialog,
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

  openCamDetailsDialog(): void {
    let dialogRef = this.dialog.open(CameraDetails, {
      width: '600px',
    });
  }

}

@Component({
  selector: 'camera_details',
  templateUrl: './modals/camera_details.html',
  styleUrls: ['./details.component.css']
})

export class CameraDetails implements OnInit{

  cam_detail: any
  id: any
  infor: any[]=[]

  constructor(
  	private _services: ServiceService,
  	private route: ActivatedRoute,
    public dialogRef: MatDialogRef<CameraDetails>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: ChangeDetectorRef,
  	) 
   { 
      setInterval(() => {
      this.ngOnInit();
      this.ref.markForCheck();
    }, 1000);
  }

  ngOnInit() {
  	this.getFinerdetails(this.id)
  }

  getFinerdetails(id){
	this._services.getFinerDetails(this.id).subscribe(data=>{
		console.log(this.id)
		this.infor = data
		console.log(this.infor)
		// this.dataSource = new MatTableDataSource <Element>(this.infor)
	})
  }

}
