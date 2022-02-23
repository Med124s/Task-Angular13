import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  constructor(
    private _authentService: AuthentificationService,
    private _route: Router

  ) {}
  
  tasks: any;
  ngOnInit(): void {
    this._authentService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
      },
      (err) => {
        this._authentService.logout()
      }
    );
    console.log(this.isAdmin());
  }
  newTask(){
    this._route.navigateByUrl("/newTask");
  }
  isAdmin(){
    return this._authentService.isAdmin();
  }
}
