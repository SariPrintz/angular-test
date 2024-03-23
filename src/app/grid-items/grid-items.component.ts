import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { JsonInterface } from '../jsonInterface';
import { CommonModule, getLocaleDateFormat } from '@angular/common';
import {  Router, RouterModule } from "@angular/router"
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-grid-items',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterOutlet],
  templateUrl: './grid-items.component.html',
  styleUrl: './grid-items.component.css'
})
export class GridItemsComponent {
  constructor(private router: Router){}
  @Input() listItems! : JsonInterface[];
   @Output() newName = new EventEmitter< JsonInterface>();
 
  GetDate(date : string){
  return  getLocaleDateFormat(date,0)
  }
  
 public Router(item: JsonInterface ){
  this.router.navigate(["item",{  item: JSON.stringify(item) }])
  
 }

}


