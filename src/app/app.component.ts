import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './service/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taskJwt';
  constructor(private _route:Router,private _authentService:AuthentificationService) { }

  logout(){
    this._authentService.logout();
  }
  task(){
    this._route.navigateByUrl("/task")
  }
}
