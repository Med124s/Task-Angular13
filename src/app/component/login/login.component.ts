import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User.model';
import { AuthentificationService } from 'src/app/service/authentification.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _authentService: AuthentificationService,
    private _route:Router
  ) {}
  userForm = new FormGroup({});

  ngOnInit(): void {
    this.userForm = this._fb.group({
      userName: [''],
      password: [''],
    });
  }
  mode: number = 0;
  user: any;
  authentifier(user: any) {
    this._authentService
      .authentifier(environment.host + 'login', user)
      .subscribe(
        (data) => {
          this.user = data;
          let jwt = data.headers.get("authorization");
          this._authentService.jwtStorage(jwt);
          this._route.navigateByUrl("/task");
        },
        (err) => {
          this.mode = 1;
          console.log('Error' + err.Message);
        }
      );
  }
}
