import { GetService } from 'src/app/services/get.service';
import { Subscription } from 'rxjs';
import { Stats } from './../../modele/stats';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit ,OnDestroy{

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  stats: Stats;
  statsSubs:Subscription;
  loadingStat:boolean=false;
  constructor(private api: ApiService,private get:GetService) { }
  ngOnDestroy(): void {
    this.statsSubs.unsubscribe();
  }
  ngOnInit() {
    this.statsSubs=this.api.statsSubject.subscribe((stat:Stats)=>{
      this.stats=stat;
    })
    if(!this.api.initStats){
      //get stats
      this.loadingStat=true;
      this.get.getStats().then(res=>{
        this.loadingStat=false;
        this.api.initStats=false;
      }).catch(err=>{
        this.loadingStat=false;
      });
    }
    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());

    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
  }





  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
