import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/service/rest.service';
import { CountryModel } from 'src/models/country-model';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  public chartType: string = "pie";
  public chartLabel: string[] = [];
  public chartData: number[] = [];
  public isData: boolean = false;

  async chartFilled() {

    this.isData = false;
    await this.rest.getCountryTreeStats().subscribe((data: CountryModel[]) => {
      if (data) {
        data.forEach(items => {
          this.chartData.push(Number(items.treeCount));
          this.chartLabel.push((items.name));
        });
      }
      this.isData = true;
    });
  }

  chartOptions = {

    animation: {
      duration: 1000,
      easing: "easeInOutQuad"
    },
    responsive: true,
    legend: {
      display: true,
      position: "right",
      fullWidth: false,
      reverse: false
    },
  };

  ngOnInit() {
    this.chartFilled()

  }

}
