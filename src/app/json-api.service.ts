
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonInterface } from './jsonInterface';
import { of, Observable, catchError, switchMap, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JsonApiService {

  constructor(private httpClient: HttpClient) { }




public getData(): Observable<JsonInterface[]> {
   return   this.httpClient.get<JsonInterface[]>('./assets/angular_Response.json')
    .pipe(
      catchError( err =>{
        console.log(err);
        return of([])
      }    
      ),
      switchMap(response => { 
     return  of( Object.values(response)[0] as unknown  as JsonInterface[])
        })
    );
  
}

update( data: JsonInterface): Observable<JsonInterface> {
 
  const options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: data
  };

  return this.httpClient.put<JsonInterface>('./assets/angular_Response.json', options);
}
 
}
