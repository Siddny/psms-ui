import { Component, OnInit } from '@angular/core';
import { ServiceService } from './services/service.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cam_type_list: any[]=[]
  newCamType: CameraType = new CameraType()
  newCam: Camera = new Camera()
  constructor(
    private _services: ServiceService,
    ){}

  displayedColumns = ['name'];
  dataSource: any;
  
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


  ngOnInit(){

    //list camara types
    this._services.getCameraType().subscribe(data=>{
      this.cam_type_list = data;
      console.log(this.cam_type_list)
      this.dataSource = new MatTableDataSource <Element>(this.cam_type_list)
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

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
];