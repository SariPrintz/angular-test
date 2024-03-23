import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListItemsComponent } from './list-items/list-items.component';
import{GridItemsComponent} from './grid-items/grid-items.component'
import { Observable, of, switchMap } from 'rxjs';
import { JsonApiService } from './json-api.service';
import { JsonInterface } from './jsonInterface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ListItemsComponent,CommonModule,GridItemsComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private jsonApi: JsonApiService){}

  public data$!: Observable<JsonInterface[]> ;
  public display : string ="Grid display";
  asc: Boolean = false;
  public searchTerm = '';
  ngOnInit() {  
  this.data$  = this.jsonApi.getData();
  this.Sort();
   }

   ChangeDisplay(){
    this.display=this.display === "Grid display" ?"List display" : "Grid display" ;
   }

    filter() {
      this.data$= this.data$.pipe(
      switchMap(data=>{
        return of(data.filter(item =>(item.Title.includes(this.searchTerm) || item.Year.includes(this.searchTerm) )))
      })
     )
      
    }
   
  refrese(){
    this.data$  = this.jsonApi.getData();
  }
  Clear(){
    this.searchTerm = '';
   this.filter();
  }

  Sort(){ 
    this.asc = !this.asc;
   this.data$ = this.data$.pipe(
    switchMap(data=>{
      return of( data.sort((a, b) =>{
        if(a.Title < b.Title) { return this.asc? -1 : 1; }
        if(a.Title > b.Title) { return this.asc? 1 : -1; }
        return 0;
      }));
      })
    )
    
  }

  saveNewName(data : JsonInterface){
     this.jsonApi.update(data);
  }

  }
