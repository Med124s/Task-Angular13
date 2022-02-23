import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  jwtToken:any = null;
  constructor(private _http:HttpClient,private _route: Router){}
  getResource(url:any){
    if(this.jwtToken == null){
      this.jwtToken = localStorage.getItem("jwt");
    }
    return this._http.get(url,{headers:new HttpHeaders({"authorization":this.jwtToken})});//onPass header pour chaque action
  }
  logout(){
    this.jwtToken = null;
  }
  
  postUser(url:any,user:any){
    return this._http.post(url,user,{observe:"response"});//pas converter en forma JSON car login de spring n'attend pas le forma json,donc observe il recuperer le code d'error drequete http
  }
  postResource(url:any,body:any){
    return this._http.post(url,body,{headers:new HttpHeaders({"authorization":this.jwtToken})});//pas converter en forma JSON car login de spring n'attend pas le forma json,donc observe il recuperer le code d'error drequete http
  }
}
