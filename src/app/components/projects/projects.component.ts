import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AssetsService } from '../../services/assets/assets.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: any=[];

  constructor(
  	public dialog: MatDialog,
  	private _assetService: AssetsService,
  	) { }

  ngOnInit() {
  	this.getProjects();
  }

  getProjects(){
  	this._assetService.getProjects().subscribe(data=>{
      this.projects = data
  	  console.log(data)
    })
  }

  openProjectDialog(): void {
    let dialogRef = this.dialog.open(NewProjectDialog, {
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getProjects();
    });
  }
}

@Component({
  selector: 'new_project',
  templateUrl: 'modals/new_project.html',
})

export class NewProjectDialog implements OnInit{

  new_project: Project = new Project();
  emp_list: any=[];

  constructor(
  	private _assetService: AssetsService,
    public dialogRef: MatDialogRef<NewProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(){
  	this.getEmployees();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  newProject(){
  	this._assetService.newProject(this.new_project).subscribe(data=>{
  		this.new_project = new Project();
  	})
    this.dialogRef.close();
  }

  getEmployees(){
  	this._assetService.getEmployees().subscribe(data=>{
  		console.log(data);
  		this.emp_list = data;
  	})
  }
}

export class Project{
	name: any;
	client:any;
	producer:any;
	location: any;
}