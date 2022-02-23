import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../Model/User.model';
import { CatalogueService } from './catalogue.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private roles:Array<any> = [];
  constructor(private _catalogService:CatalogueService,private _route: Router
    ) { }
  
  getUser(user:User){
    return this._catalogService.getResource(environment.host+"Search/"+user.userName)
  }
  authentifier(url:any,user:any){
    return this._catalogService.postUser(url,user);
  }
  jwtStorage(jwt:any){
    localStorage.setItem("jwt",jwt);
  }
  getTasks(){
    return this._catalogService.getResource(environment.host+"tasks");
  }
 
  logout(){
    this._catalogService.logout();
    localStorage.removeItem("jwt");
    this._route.navigateByUrl("/login")

  }

  isAdmin(){
    let jwtHelper = new JwtHelperService();
    let jwt:any = localStorage.getItem("jwt");
    this.roles = jwtHelper.decodeToken(jwt).roles;//acceder to claims roles
    for(let r of this.roles){
      if(r.authority == "ADMIN")
        return true;
    }
    return false
  }
}
