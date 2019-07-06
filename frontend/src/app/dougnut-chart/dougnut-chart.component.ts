import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryModel } from 'src/models/country-model';

@Component({
  selector: 'app-dougnut-chart',
  templateUrl: './dougnut-chart.component.html',
  styleUrls: ['./dougnut-chart.component.scss']
})
export class DougnutChartComponent implements OnInit {

  public chartType: string = "doughnut";
  public chartLabel: string[] = [];
  public chartData: number[] = [];
  public isData: boolean = false;

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

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
      reverse: true
    },
  };


  ngOnInit() {
    this.chartFilled();
  }

}
