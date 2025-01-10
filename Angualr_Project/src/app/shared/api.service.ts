import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RestaurentData } from '../restaurent-dash/restaurent.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:5200/api/Record';

  constructor(private _http: HttpClient) {}

  // POST request
  addRestaurent(data: RestaurentData) {
    return this._http.post<any>(this.apiUrl, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // GET request
  getRestaurent() {
    return this._http.get<any>(this.apiUrl).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // DELETE request
  deleteRestaurant(id: string) {
    return this._http.delete(`http://localhost:5200/api/record/${id}`);
  }
  
  

  // PUT request
  updateRestaurant(id: any, data: any) {
    return this._http.put(`http://localhost:5200/api/record/${id}`, data);
  }
  
  
}
