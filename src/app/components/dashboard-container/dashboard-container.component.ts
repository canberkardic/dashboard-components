import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { IDashboard } from 'src/app/models/dashboard';
import { IDashboardComponent } from 'src/app/models/dashboard-component';
import { DashboardService } from 'src/app/services/dashboard.service';
import { getDashboardComponents } from 'src/app/shared/decorator/decorator-helpter';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],

})
export class DashboardContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('componentsSidenav', { static: true }) public componentSidenav: MatSidenav;

  sidenavItems?: IDashboardComponent[];
  dashboards: IDashboard[];
  id: string;
  dashboardName: string;
  editDashboardNameMode: boolean = false;

  constructor(
    private _dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sidenavItems = getDashboardComponents();
    this._dashboardService.getDefaultDashboards().subscribe((data: IDashboard[]) => {
      const { id, name } = data[0];
      this.dashboards = data;

      this.id = id;
      this.dashboardName = name;
    })
  }

  ngAfterViewInit() {

  }

  onToggleSidenav() {
    this.componentSidenav.toggle();
  }

  onMenuClick(item: IDashboard) {
    this.id = item.id;
    this.dashboardName = item.name;
  }

  onNewTab(item: IDashboard) {
    let url = this.router.createUrlTree(['/dashboard'], { queryParams: { 'dashid': item.id } })
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
