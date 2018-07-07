import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AssetsService } from '../../services/assets/assets.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  toppings = new FormControl();
  showSelected: boolean = false;
  
  constructor(
  	public dialog: MatDialog,
  	) { }

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  
  ngOnInit() {
  
  }

  assignEquipmentsDiv() {
      this.showSelected = !this.showSelected
  }

  openCrewMemberDialog(group): void {
    let dialogRef = this.dialog.open(CrewMemberDialog, {
      width: '600px',
      data: {object: group },
    });
    dialogRef.afterClosed().subscribe(result => {
		// this.getGroups();
    });
  }
}

@Component({
  selector: 'crew_member',
  templateUrl: 'modals/crew_member.html',
})

export class CrewMemberDialog implements OnInit{

  group_users: any[]=[];
  all_users: any[]=[];
  grp_id: any;
  new_crew_member: GrpUser = new GrpUser();
  grp_users_: any[]=[];
  index: any;

  default_grp: any;
  grp_: any;

  available_orgnisation: any[]=[];

  constructor(
  	private _assetService: AssetsService,
  	public dialogRef: MatDialogRef<CrewMemberDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(){
  	this.grp_ = this.data.object
  	this.grp_id = this.data.object.id
  	this.getGroupUsers();
  	this.getAllUsers();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllUsers(){
  	// this._grpService.getErpGroupUsers(this.default_grp).subscribe(data=>{
  	// 	this.all_users = data
  	// 	console.log(data)
  	// })
  }

  getGroupUsers(){
  	// this._grpService.getErpGroupUsers(this.grp_id).subscribe(data=>{
  	// 	this.group_users = data
  	// 	console.log(data)
  	// })
  }

  getUsers(item:any){
  	if(this.grp_users_.includes(item)){
  		this.index = this.grp_users_.indexOf(item);
  		this.grp_users_.splice(this.index,1);
  	}else{
  		this.grp_users_.push(item)
  	}
  }

  addGroupUser(){
  	console.log(this.grp_users_);
  	console.log(this.new_crew_member);
  	this.new_crew_member['group_id'] = this.grp_id
  	this.new_crew_member['users'] = this.grp_users_
  	// this._grpService.addErpGroupUser(this.new_crew_member).subscribe(data=>{
  	// 	this.new_crew_member = new GrpUser();
  	// });
  	this.dialogRef.close();
  }
}

export class GrpUser{
	group_id: any;
	users: any;
}