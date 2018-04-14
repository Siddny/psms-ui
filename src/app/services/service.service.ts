import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AppConst } from '../constants/app.constants';

const httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ServiceService {

  public serverPath: string = AppConst.serverPath

  constructor(private http: Http) { }

  // create new type of camera
  newCameraType(name:any){
  	let url = this.serverPath+'/new_type/'
    let headers = new Headers({
      'Content-Type' : 'application/json',
    });
  	return this.http.post(url , JSON.stringify(name), {headers : headers})
  }

  //show types of cameras
  getCameraType(){
    let url = this.serverPath+'/camera_types/'
    return this.http.get(url).map(response=>response.json())
  }

  listCategory(id) {
    let url = this.serverPath+'/camera_types/'+id+'/'
    let headers = new Headers({
      'Content-Type' : 'application/json',
    });
    return this.http.get(url).map(response=>response.json())
  }

  //create camera details
  newCameraDetail(name:any){
    let url = this.serverPath+'/camera_detail_create/'
    let headers = new Headers({
      'Content-Type' : 'application/json',
    });
    return this.http.post(url, JSON.stringify(name), {headers: headers})
  }
  
  //ya keegan 
  addCameraDetail(name:any){
    let url = this.serverPath+'/camera_detail_add/'
    let headers = new Headers({
      'Content-Type' : 'application/json',
    });
    return this.http.post(url, JSON.stringify(name), {headers: headers})
  }

  //get camera details
  getCameraDetails(id){
    let url = this.serverPath+'/camera_detail/'
    // return this.http.get(url).map(response=>response.json())
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

  // getStocks(){
  //   let url = 'https://127.0.0.1:8000/proc/stock/list/';
  //   return this.http.get(url).map(response=> response.json())
  // }

  // getStockList(id) {
  //   let url = 'https://127.0.0.1:8000/proc/stock/get/'+id+'/';
  //   return this.http.get(url).map(response=>response.json())
  // }

  // newStockProduct(stockproduct:any) {
  //   let url = 'https://127.0.0.1:8000/proc/product/';
  //   let headers = new Headers({
  //     'Content-Type' : 'application/json',
  //   });
  //   return this.http.post(url, JSON.stringify(stockproduct), {headers : headers});
  // }

}
