import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { IDashboard } from 'src/app/models/dashboard';
import { IDashboardComponent } from 'src/app/models/dashboard-component';
import { DashboardService } from 'src/app/services/dashboard.service';

import { getDashboardComponents } from '../../shared/decorator/dashboard-component-decorator-helper';
import { DashboardStore, defaultState, DashboardContainerState } from './dashboard-store';
import { DialogService } from '../../shared/dialog/dialog.service';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
  providers: [DashboardStore]
})
export class DashboardContainerComponent implements OnInit {
  @ViewChild('componentsSidenav', { static: false }) public componentSidenav: MatSidenav;

  components?: IDashboardComponent[];
  dashboards: IDashboard[];

  selectedDashboard$ = this.dashboardStore.selectedDashboard$;
  dashboards$ = this.dashboardStore.dashboards$;

  editDashboardNameMode: boolean = false;

  // Keep a clone in order to keep a copy of selected dashboard
  selectedDashboardCopy: IDashboard;

  constructor(
    private _dashboardService: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private dashboardStore: DashboardStore,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.initializeData();
    this.components = getDashboardComponents();

    this.dashboardStore.stateData$.subscribe(data => {
      console.log("State", data);
    })
  }

  initializeData() {

    let data = localStorage.getItem('dashboards');
    if (data) {
      let dashboardData = JSON.parse(data);
      this.dashboardStore.setState(dashboardData);
    } else {
      this._dashboardService.getDefaultDashboards().subscribe((dashboardData: IDashboard[]) => {
        if (dashboardData) {
          const selectedDashboard = dashboardData[0];
          this.dashboards = dashboardData;

          this.dashboardStore.loadDashboards(dashboardData);
          this.dashboardStore.updateSelectedDashboard(selectedDashboard);

          this.cloneSelectedDashboard(selectedDashboard)
        }
      })
    }


  }


  cancelEdit() {
    this.dashboardStore.updateDashboardEffect((this.selectedDashboardCopy));

    this.toggleEditMode();
  }

  saveDashboard() {
    this.dashboardStore.updateDashboardEffect(this.selectedDashboard$);
    this.toggleEditMode();
  }

  onDragStart(event: DragEvent, data: IDashboardComponent) {
    if (event.dataTransfer) {
      event.dataTransfer?.setData('component', JSON.stringify(data));
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  onNewTab(item: IDashboard) {
    let url = this.router.createUrlTree(['/dashboard'], { queryParams: { 'dashid': item.id } })
    window.open(url.toString(), '_blank')
  }


  onToggleSidenav() {
    this.componentSidenav.toggle();
  }
  onSetToDefaults() {
    let dialogRef = this.dialogService.openCustomDialog('Are you sure to restore dashbord to defaults', true);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dashboardStore.restoreToDefaults();
        window.location.reload();
      }
    })
  }

  toggleEditMode() {
    this.editDashboardNameMode = !this.editDashboardNameMode;
  }

  onMenuClick(item: IDashboard) {
    this.dashboardStore.updateDashboardEffect(item);
    this.cloneSelectedDashboard(item);
  }

  cloneSelectedDashboard(dashboardData: IDashboard) {
    this.selectedDashboardCopy = Object.assign({}, dashboardData);
  }



}
