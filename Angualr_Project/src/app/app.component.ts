import { Component } from '@angular/core';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone : false
})
export class AppComponent 
{
  title = 'MarvellousRestaurentApp';
  Record: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getRestaurent().subscribe(
      (data) => {
        this.Record = data;
      },
      (error) => {
        console.error('Error fetching batch data:', error);
      }
    );
  }
}
