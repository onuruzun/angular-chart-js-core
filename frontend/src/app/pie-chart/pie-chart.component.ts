import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/service/rest.service';
import { CountryModel } from 'src/models/country-model';
import { ColorHelper } from '../color-helper';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  providers: [ColorHelper]
})
export class PieChartComponent implements OnInit {

  constructor(
    public rest: RestService,
    private colorHelper: ColorHelper) { }

  public chartType: string = "pie";
  public chartLabel: string[] = [];
  public chartData: number[] = [];
  public isData: boolean = false;

  chartColor: any[] = [{ backgroundColor: this.colorHelper.getColors(10, true) }];

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
