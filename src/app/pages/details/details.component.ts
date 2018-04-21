import { Component, OnInit, Inject, ChangeDetectorRef, Input } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  // template: `
  //   <update_camera_details [myvalue]="idvalue"></update_camera_details>
  // `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  camera_details: any[]=[]
  my_list: any[]=[]
  id: any
  idvalue: any
  cam_type_list: any[]=[]
  cam_unit: any

  displayedColumns = ['name', 'model', 'p_serial_number', 'date_added', 'status'];
  dataSource: any;

  constructor(
  	private _services: ServiceService,
  	private route: ActivatedRoute,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
  	) {
      // setInterval(() => {
      // this.ngOnInit();
      // this.ref.markForCheck();
      //   }, 3000);
     }

  ngOnInit() {

  this._services.getCameraType().subscribe(data=>{
    this.cam_type_list = data;
    console.log(data)

    for (let item of data){
      if (this.id == item.id) {
        this.cam_unit = item.name
        console.log(item.name)
      }
    }
  })

	this.route.params.subscribe(params=>{
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

  openCamUpdateDialog(): void {
    let dialogRef = this.dialog.open(UpdateCameraDetails, {
      width: '600px',
    });
  }

  update(id){
    this.idvalue = id
    // console.log(this.idvalue)
  }

  deleteCam(id){
    console.log(id)
    this._services.DeleteCameraDetail(id).subscribe(data=>{
      console.log(data)
    })
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
	})
  }

}

@Component({
  selector: 'update_camera_details',
  templateUrl: './modals/update_camera_details.html',
  styleUrls: ['./details.component.css']
})

export class UpdateCameraDetails implements OnInit{

  @Input() myvalue: any

  id: any
  camUpdate: CameraDetailUpdate = new CameraDetailUpdate()
  details: any[]=[]

  constructor(
    private _services: ServiceService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateCameraDetails>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: ChangeDetectorRef,
    ) { }

  ngOnInit(){

    console.log(this.myvalue)
    this.route.params.subscribe(params=>{
    this.id = params['id']
    console.log(this.id)
    // this._services.getFinerDetails(this.id).subscribe(data=>{
    //   this.details = data
    //   console.log(this.details)
    // })
  })
    this.getFinerdetails(this.myvalue)
  }

  getFinerdetails(myvalue){
  this._services.getFinerDetails(this.myvalue).subscribe(data=>{
    console.log(this.myvalue)
    this.details = data
    console.log(this.details)
    })
  }

  updateCam(id){
    this._services.PutCameraDetail(id).subscribe(data=>{
      this.camUpdate = new CameraDetailUpdate()
      console.log(this.camUpdate)
    })
  }

}

export class CameraDetailUpdate{
  name: string;
  model: string;
  p_serial_number: string;
  status: string;
  camera_type: string;
}
