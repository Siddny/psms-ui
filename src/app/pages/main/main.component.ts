import { Component, OnInit, Inject } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  view1: any[] = [175, 150];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  cam_type_list: any[]=[]
  showdiv: boolean= true
  newCamDetail: CameraDetail = new CameraDetail()
  cameras_list: any[]=[]

  displayedColumns = ['name'];
  dataSource: any;
  addTypeRow = ['Add'];

  constructor(
    private _services: ServiceService,
    public dialog: MatDialog,
    ) { }
    
  ngOnInit() {
    //list camera types
    this._services.getCameraType().subscribe(data=>{
      this.cam_type_list = data;
      console.log(this.cam_type_list)
      this.dataSource = new MatTableDataSource <Element>(this.cam_type_list)

      if (data.length==0) {
        // code...
        this.showdiv = false
      }
    })

    //get all cameras
    this._services.getAllCam().subscribe(data=>{
      this.cameras_list = data.length
      console.log(this.cameras_list)
    })
  }

  openCamTypeDialog(): void {
    let dialogRef = this.dialog.open(NewCamType, {
      width: '600px',
    });
  }

  newCameraDetail(){
    this._services.newCameraDetail(this.newCamDetail).subscribe(res=>{
      this.newCamDetail = new CameraDetail()
      console.log(this.newCamDetail)
    })
  }

  newCameraDetailsssss(){
    this._services.addCameraDetail(this.newCamDetail).subscribe(res=>{
      this.newCamDetail = new CameraDetail()
      console.log(this.newCamDetail)
    })
  }
}

@Component({
  selector: 'add_camera_type',
  templateUrl: './modals/add_camera_type.html',
  styleUrls: ['./main.component.css']
})
export class NewCamType {

  newCamType: CameraType = new CameraType()

  constructor(
    private _services: ServiceService,
    public dialogRef: MatDialogRef<NewCamType>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  newCameraType(){
    this._services.newCameraType(this.newCamType).subscribe(res=>{
    this.newCamType = new CameraType()
    console.log(this.newCamType)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export class CameraType{
  name: string;
}

export class CameraDetail{
  name: string;
  model: string;
  status: string;
  camera_type: string;
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}