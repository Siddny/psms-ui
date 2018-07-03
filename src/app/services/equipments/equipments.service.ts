import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AppConst } from '../../constants/app.constants';

const headers = new Headers({
      'Content-Type' : 'application/json',
      // 'Authorization' : localStorage.getItem("token"),
    });

@Injectable()
export class EquipmentsService {

  public serverPath: string = AppConst.localPath;

  constructor(private http: Http) { }

  newItem(name:any){
  	let url = this.serverPath+'/items';
  	return this.http.post(url , JSON.stringify(name), {headers : headers});
  }

  getItems(){
    let url = this.serverPath+'/items';
    return this.http.get(url, {headers : headers}).map(response=>response.json());
  }
}
