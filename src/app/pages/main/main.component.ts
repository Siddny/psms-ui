import { Component, OnInit, Inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { status } from '../../../assets/json/status'
// import * as jsPDF from 'jspdf';
import { HostListener } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild('cmd') cmd: any;
  @ViewChild('content') content: any;

  theme = 'dark';
  // minWidth = [700]
  view: any[] = [];
  view1: any[] = [175, 150];
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#A10A28', '#AAAAAA']
  };

  cam_type_list: any[]=[]
  showdiv: boolean= true
  newCamDetail: CameraDetail = new CameraDetail()
  cameras_list: any[]=[]
  good: number
  fair: number
  bad: number
  status: any[]=[]

  displayedColumns = ['name'];
  dataSource: any;
  addTypeRow = ['Add'];

  screenHeight: any;
  screenWidth: any;

  constructor(
    private _services: ServiceService,
    public dialog: MatDialog,
    private ref: ChangeDetectorRef,
    private router:Router,
    ) 
    {
      setInterval(() => {
      this.ngOnInit();
      this.ref.markForCheck();
      }, 1000);
      
    Object.assign(this, {status})

    // this.screenHeight = (window.screen.height);
    // this.screenWidth = (window.screen.width);
    // console.log(this.screenHeight);
    // console.log(this.screenWidth);

    // this.view = [(this.screenWidth*0.93), (this.screenHeight/5)];
    // console.log(this.view)
    this.onResize();

    }
    
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.view = [(this.screenWidth*0.93), (this.screenHeight/4.5)];
  }

  ngOnInit() {
    
    //list camera types
    this.getCameraTypes()

    //get all cameras
    this._services.getAllCam().subscribe(data=>{
      this.cameras_list = data.length
      console.log(this.cameras_list)
      
      let bad_cam = 0
      for (let items of data) if (items.status == "Bad") bad_cam++;
      console.log("bad "+bad_cam)
      this.bad = bad_cam

      let fair_cam: number = 0
      for (let items of data) if (items.status == "Fair") fair_cam++;
      console.log("fair "+fair_cam)
      this.fair = fair_cam

      let good_cam: number = 0
      for (let items of data) if (items.status == "Good") good_cam++;
      console.log("good "+good_cam)
      this.good = good_cam
      console.log(this.good)


      this.status = [
        {
          "name": "Good",
          "value": this.good
        },
        {
          "name": "Fair",
          "value": this.fair
        },
        {
          "name": "Bad",
          "value": this.bad
        }
      ];

    })
  }

  getCameraTypes(){
    //list camera types
    this._services.getCameraType().subscribe(data=>{
      this.cam_type_list = data;
      console.log(this.cam_type_list)
      this.dataSource = new MatTableDataSource <Element>(this.cam_type_list)

      if (data.length==0) {
        this.showdiv = false
      }
    })
  }
  // downloadPDF(){
  // const doc = new jsPDF();
  // const specialElementHandlers = {
  //     '#editor': function (element, renderer) {
  //         return true;
  //     }
  // };

  // this.cmd.click(function () {
  //   doc.fromHTML(this.content.html(), 15, 15, {
  //     'width': 170,
  //     'elementHandlers': specialElementHandlers
  //   });
  // doc.save('sample-file.pdf');
  // });    
  // }

// lol(){
//   const doc = new jsPDF();
//   const specialElementHandlers = {
//     '#editor': function (element, renderer) {
//       return true;
//     }
//   }
//   doc.fromHTML(this.content, 15, 15, {
//       'width': 170,
//       'elementHandlers': specialElementHandlers
//     });
//   doc.save('sample-file.pdf');
// }

  openCamTypeDialog(): void {
    let dialogRef = this.dialog.open(NewCamType, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      //list camera types
      this.getCameraTypes()
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

  choice_s = [
    {value: 'Good', viewValue: 'Good'},
    {value: 'Fair', viewValue: 'Fair'},
    {value: 'Bad', viewValue: 'Bad'}
  ];
}

// const status: Array<any> = [
//   {
//     "name": "Good",
//     "value": 43
//   },
//   {
//     "name": "Fair",
//     "value": 34
//   },
//   {
//     "name": "Bad",
//     "value": 34
//   }
// ];


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
  p_serial_number: string;
  status: string;
  camera_type: string;
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}