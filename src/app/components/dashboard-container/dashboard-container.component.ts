


import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { IDashboard } from 'src/app/models/models';
import { DashboardService } from 'src/app/services/dashboard.service';
import { getDashboardComponents } from 'src/app/services/decorator/decorator-helpter';


@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('componentsSidenav', { static: true }) public componentSidenav: MatSidenav;

  sidenavItems?: any[];

  dashboards: any[];


  dashboardId: string;
  dashboardName: string;

  editDashboardNameMode: boolean = false;

  dashboardDetails: any;

  constructor(
    private _dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sidenavItems = getDashboardComponents();
    this._dashboardService.getDefaultDashboards().subscribe((data: any) => {
      this.dashboards = data;
      const { dashboardId, name } = data[0];
      this.dashboardId = dashboardId;
      this.dashboardName = name;
    })
  }

  ngAfterViewInit() {

  }

  onToggleSidenav() {
    this.componentSidenav.toggle();
  }

  onMenuClick(item: IDashboard) {
    this.dashboardId = item.id;
    this.dashboardName = item.name;
  }

  onNewTab(item: any) {
    let url = this.router.createUrlTree(['/dashboard'], { queryParams: { 'dashid': item.dashboardId } })
    window.open(url.toString(), '_blank')
  }

  editDashboardName() {
    this.editDashboardNameMode = !this.editDashboardNameMode;
  }

  saveDashboardName() {
    this.editDashboardName();
  }

  onDragStart(event: DragEvent, data: any) {
    if (event.dataTransfer) {
      event.dataTransfer?.setData('component', JSON.stringify(data));
      event.dataTransfer.dropEffect = 'copy';
    }
  }



}
