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

  message: string;
  name: string;
  del_goback: boolean = false

  camera_details: any[]=[]
  my_list: any[]=[]
  id: any
  idvalue: any
  cam_type_list: any[]=[]
  cam_unit: any
  update_status: CameraDetailUpdate = new CameraDetailUpdate()

  displayedColumns = ['name', 'model', 'p_serial_number', 'date_added', 'status', 'delete'];
  dataSource: any;

  choice_s = [
    {value: 'Good', viewValue: 'Good'},
    {value: 'Fair', viewValue: 'Fair'},
    {value: 'Bad', viewValue: 'Bad'}
  ];
  
  constructor(
  	private _services: ServiceService,
  	private route: ActivatedRoute,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
  	) {
      // setInterval(() => {
      // this.ngOnInit();
      // this.ref.markForCheck();
      //   }, 5000);
     }

  ngOnInit() {

    //get camera units list
    this.getCameraUnitsList()
    
    //from the list of cameras, get the id and name of a specitic camera type
    this._services.getCameraType().subscribe(data=>{
      this.cam_type_list = data;
      console.log(this.cam_type_list)

      for (let item of data){
        if (this.id == item.id) {
          this.cam_unit = item.name
          console.log(item.name)
        }
      }
    })

  }

  getCameraUnitsList(){
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

  update(id){
    this.idvalue = id
    // console.log(this.idvalue)
  }

  // changeStatus(status){
  //   this.update_status['camera_type'] = this.data.object.camera_type
  //   this._services.putCameraDetail(id,this.update_status).subscribe(data=>{
  //     this.update_status = new CameraDetailUpdate()
  //     console.log(this.update_status)
  //   })
  // }

  deleteCam(id){
    console.log(id)
    this._services.DeleteCameraDetail(id).subscribe(data=>{
      console.log(data)
      this.getCameraUnitsList();
    })
  }

  deleteCamType(id){
    console.log(this.my_list.length)
    if(this.my_list.length == 0){
      this._services.DeleteCameraType(id).subscribe(data=>{
        console.log(data)
        this.del_goback = true
      })    
    }else{
      this.message = "Cannot delete. List is not empty!"
      console.log("list is not empty")
    }
  }

  openCamDetailsDialog(): void {
    let dialogRef = this.dialog.open(CameraDetails, {
      width: '600px',
    });
  }

  openCamUpdateDialog(element): void {
    let dialogRef = this.dialog.open(UpdateCameraDetails, {
      width: '800px',
      data: {object: element}
    });
  }

  openCamUnitDialog(): void {
    let dialogRef = this.dialog.open(NewCamUnit, {
      width: '600px',
      data: { id: this.id, name: this.name },
    });
    dialogRef.afterClosed().subscribe(result => {
      //list camera types
      this.getCameraUnitsList()
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
  	) { }

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

  id: any
  details: any[]=[]
  updated_camera: CameraDetailUpdate = new CameraDetailUpdate()
  cam_id = this.data.object.id

  constructor(
    private _services: ServiceService,
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<UpdateCameraDetails>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: ChangeDetectorRef,
    ) { }

  ngOnInit(){
    this.updated_camera = this.data.object
    console.log(this.updated_camera)
    console.log(this.cam_id)
    this.getFinerdetails(this.cam_id)
  }

  getFinerdetails(myvalue){
  this._services.getFinerDetails(this.cam_id).subscribe(data=>{
    console.log(this.cam_id)
    this.details = data
    console.log(this.details)
    })
  }

  updateCam(id){
    this.updated_camera['camera_type'] = this.data.object.camera_type
    this._services.putCameraDetail(this.cam_id, this.updated_camera).subscribe(data=>{
      this.updated_camera = new CameraDetailUpdate()
      console.log(this.updated_camera)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  choice_s = [
    {value: 'Good', viewValue: 'Good'},
    {value: 'Fair', viewValue: 'Fair'},
    {value: 'Bad', viewValue: 'Bad'}
  ];
}



@Component({
  selector: 'add_camera_unit',
  templateUrl: './modals/add_camera_unit.html',
  styleUrls: ['./details.component.css']
})
export class NewCamUnit implements OnInit{

  newCamUnit: CameraUnit = new CameraUnit()
  camera_details: any[]=[]
  my_list: any[]=[]
  id: any
  cam_type_list: any[]=[]
  cam_unit: any

  constructor(
    private _services: ServiceService,   
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<NewCamUnit>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(){
    console.log(this.data.id)

    //from the list of cameras, get the name of a specitic camera type
    this._services.getCameraType().subscribe(data=>{
      this.cam_type_list = data;
      console.log(data)

      for (let item of data){
        if (this.data.id == item.id) {
          this.cam_unit = item.name
          console.log(this.cam_unit)
        }
      }
    })
  }

  newCameraType(){
    this.newCamUnit['camera_type'] = this.data.id
    this._services.newCameraDetail(this.newCamUnit).subscribe(res=>{
    this.newCamUnit = new CameraUnit()
    console.log(this.newCamUnit)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  choice_s = [
    {value: 'Good', viewValue: 'Good'},
    {value: 'Fair', viewValue: 'Fair'},
    {value: 'Bad', viewValue: 'Bad'}
  ];
}

export class CameraDetailUpdate{
  name: string;
  model: string;
  p_serial_number: string;
  status: string;
  camera_type: string;
}

export class CameraUnit{
  name: string;
  model: string;
  p_serial_number: string;
  status: string;
  camera_type: string;
}