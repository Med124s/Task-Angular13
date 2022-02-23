import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogueService } from 'src/app/service/catalogue.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  constructor(private _catalogService:CatalogueService,private _route: Router) { }

  ngOnInit(): void {
  }
  task:any;
  newTask(task:Task){
    this._catalogService.postResource(environment.host+"tasks",task).subscribe(
      data=>{
        this.task = data;
        this._route.navigateByUrl("/task");
      },
      err=>console.log("Error task")
    );
  }

}
