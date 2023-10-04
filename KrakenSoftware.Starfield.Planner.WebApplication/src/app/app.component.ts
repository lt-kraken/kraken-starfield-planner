import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public forecasts?: WeatherForecast[];

  constructor(http: HttpClient) {
    const url = 'https://starfield-planner-api.krakensoftware.eu/weatherforecast';
    http.get<WeatherForecast[]>(url).subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }

  title = 'KrakenSoftware.Starfield.Planner.WebApplication';
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}