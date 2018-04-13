import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  cam_type_list: any[]=[]
  newCamType: CameraType = new CameraType()
  newCam: Camera = new Camera()

  displayedColumns = ['name'];
  dataSource: any;

  constructor(private _services: ServiceService,) { }
    
  ngOnInit() {
    //list camara types
    this._services.getCameraType().subscribe(data=>{
      this.cam_type_list = data;
      console.log(this.cam_type_list)
      this.dataSource = new MatTableDataSource <Element>(this.cam_type_list)
    })
  }

  newCameraType(){
    this._services.newCameraType(this.newCamType).subscribe(res=>{
    this.newCamType = new CameraType()
    console.log(this.newCamType)
    })
  }

  newCamera(){
    this._services.newCamera(this.newCam).subscribe(res=>{
      this.newCam = new Camera()
      console.log(this.newCam)
    })
  }

}

export class CameraType{
  name: string;
}

export class Camera{
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