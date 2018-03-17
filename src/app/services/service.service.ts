import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


const httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ServiceService {

  constructor(private http: Http) { }

  getCameraType(){
  	let url = 'http://psms.herokuapp.com/camera_types/'
  	return this.http.get(url).map(response=>response.json())
  }

  newCameraType(name:any){
  	let url = 'http://psms.herokuapp.com/new_type/'
    let headers = new Headers({
      'Content-Type' : 'application/json',
    });
  	return this.http.post(url , JSON.stringify(name), {headers : headers})
  }

  listCategory(id) {
    let url = 'http://psms.herokuapp.com/camera_types/'+id+'/'
    let headers = new Headers({
      'Content-Type' : 'application/json',
    });
    return this.http.get(url).map(response=>response.json())
  }

  newCamera(name:any){
    let url = 'http://psms.herokuapp.com/camera_detail_create/'
    let headers = new Headers({
      'Content-Type' : 'application/json',
    });
    return this.http.get(url).map(response=>response.json())
  }

  

  // getStocks(){
  //   let url = 'http://127.0.0.1:8000/proc/stock/list/';
  //   return this.http.get(url).map(response=> response.json())
  // }

  // getStockList(id) {
  //   let url = 'http://127.0.0.1:8000/proc/stock/get/'+id+'/';
  //   return this.http.get(url).map(response=>response.json())
  // }

  // newStockProduct(stockproduct:any) {
  //   let url = 'http://127.0.0.1:8000/proc/product/';
  //   let headers = new Headers({
  //     'Content-Type' : 'application/json',
  //   });
  //   return this.http.post(url, JSON.stringify(stockproduct), {headers : headers});
  // }

}
