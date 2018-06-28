import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AppConst } from '../constants/app.constants';

const httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
};

const headers = new Headers({
      'Content-Type' : 'application/json',
    });

@Injectable()
export class ServiceService {

  public serverPath: string = AppConst.serverPath

  constructor(private http: Http) { }

  // create new type of camera
  newCameraType(name:any){
  	let url = this.serverPath+'/new_type/'
  	return this.http.post(url , JSON.stringify(name), {headers : headers})
  }

  //show types of cameras
  getCameraType(){
    let url = this.serverPath+'/camera_types/'
    return this.http.get(url).map(response=>response.json())
  }

  listCategory(id) {
    let url = this.serverPath+'/camera_types/'+id+'/'
    return this.http.get(url).map(response=>response.json())
  }

  //delete camera type
  DeleteCameraType(id){
    let url = this.serverPath+'/delete_cam_type/'+id+'/'
    return this.http.delete(url, {headers:headers})
  }

  //create camera details
  newCameraDetail(name:any){
    let url = this.serverPath+'/camera_detail_create/'
    return this.http.post(url, JSON.stringify(name), {headers: headers})
  }
  
  //ya keegan 
  addCameraDetail(name:any){
    let url = this.serverPath+'/camera_detail_add/'
    return this.http.post(url, JSON.stringify(name), {headers: headers})
  }

  //get all cameras
  getAllCam(){
    let url = this.serverPath+'/camera_detail/'
    return this.http.get(url).map(response=>response.json())
  }

  //get camera details per camera category id
  getCameraDetails(id){
    let url = this.serverPath+'/camera_detail/'
    return this.http.get(url).map(response=>{
      let data = response.json().filter(item=>{
        if (item.camera_type == id) {
          return item
        }
      })
      console.log(data)
      return data
    })
  }

  //get Finer Details 
  getFinerDetails(id){
    let url = this.serverPath+'/camera_detail/'
    return this.http.get(url).map(response=>{
      let data = response.json().filter(item=>{
        if (item.id == id) {
          return item
        }
      })
      console.log(data)
      return data
    })
  }

  putCameraDetail(id, updated_camera){
    let url = this.serverPath+'/up/'+id+'/'
    return this.http.put(url, JSON.stringify(updated_camera), {headers:headers})
  }

  DeleteCameraDetail(id){
    let url = this.serverPath+'/del/'+id+'/'
    return this.http.delete(url, {headers:headers})
  }
}
