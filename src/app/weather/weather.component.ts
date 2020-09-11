import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  SelectedCity: any;
  AvgArray: any = [];
  showLoader: boolean;
  constructor(
    private weatherService: WeatherService) { }
  ngOnInit() {
    this.SelectedCity = 'Select City >';
    this.showLoader = false;

  }
  SelectCity(city) {
    this.showLoader = true;
    this.AvgArray = [];
    this.SelectedCity = city;
    this.weatherService.getWOE_ID(city)
      .subscribe((data: any) => {
        this.weatherService.getTemp(data[0].woeid).subscribe(responseList => {
          let obj: any = [];
          for (let i = 0; i < responseList.length; i++) {
            obj = responseList[i];
            let d = new Date(obj[0].created);
            let dt = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();;
            // console.log(dt);
            let average = obj.reduce((total, next) => total + next.the_temp, 0) / obj.length;
            // console.log(average.toFixed(2));
            this.AvgArray.push({ date: dt, average: average.toFixed(2) });
          }
          this.showLoader = false;
        });
      });
  }
}
