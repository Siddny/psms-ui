import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppConst } from '../../constants/app.constants';
import 'rxjs/Rx';


const headers = new Headers({
      'Content-Type' : 'application/json',
    });

@Injectable()
export class AssetsService {

  public serverPath: string = AppConst.serverPath

  constructor(private http: Http) { }

  newEmployee(employee:any){
  	let url = this.serverPath+'/employees/'
  	return this.http.post(url , JSON.stringify(employee), {headers : headers})
  }

  getEmployees(){
  	let url = this.serverPath+'/employees/'
  	return this.http.get(url, {headers : headers}).map(response=> response.json());
  }

  newEquipment(equipment:any){
  	let url = this.serverPath+'/equipments/'
  	return this.http.post(url , JSON.stringify(equipment), {headers : headers})
  }

  getEquipment(){
  	let url = this.serverPath+'/equipments/'
  	return this.http.get(url, {headers : headers}).map(response=> response.json());
  }

  newAssign(assign:any){
  	let url = this.serverPath+'/assign_tool/'
  	return this.http.post(url , JSON.stringify(assign), {headers : headers})
  }

  getAssign(){
  	let url = this.serverPath+'/assign_tool/'
  	return this.http.get(url, {headers : headers}).map(response=> response.json());
  }

  newProject(project:any){
    let url = this.serverPath+'/projects/'
    return this.http.post(url , JSON.stringify(project), {headers : headers})
  }

  getProjects(){
    let url = this.serverPath+'/projects/'
    return this.http.get(url, {headers : headers}).map(response=> response.json());
  }
}
