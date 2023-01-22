
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { DisplayGrid, GridsterConfig, GridsterItem, GridsterItemComponent, GridsterItemComponentInterface, GridType } from 'angular-gridster2';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

import * as uuid from 'uuid';

import { IDashboard, IDashboardWidget } from 'src/app/models/dashboard';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ErrorDialogService } from 'src/app/shared/error-dialog/error-dialog.service';
import { IDashboardComponent } from '../../models/dashboard-component';
import { findComponentInRegistry } from 'src/app/shared/decorator/dashboard-component-decorator-helper';
import { DashboardStore } from '../dashboard-container/dashboard-store';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnChanges, AfterViewInit, IDashboard {

  @ViewChildren('component') dynamicComponents!: QueryList<ElementRef>
  @ViewChild('gridsterItem', { static: false }) gridItem!: GridsterItemComponent;

  @Input()
  id: string;

  @Input()
  name: string;

  @Input()
  data: IDashboard;

  /* 
    If a child (dashboard component emit settings from it's configuration)
    this function redirects it to the handler function to save settings.
  */
  outputs = {
    preferenceSetted: (item: any) => this.onPreferenceSetted(item)
  }

  options: GridsterConfig;

  widgetList: IDashboardWidget[];

  //needed for highcharts resize
  private unitHeight!: number;

  isLoading: boolean = false;
  showSettingsButton: boolean = true;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private _dashboardService: DashboardService,
    private dialogService: DialogService,
    private _errorDialogService: ErrorDialogService,
    private dashboardStore: DashboardStore
  ) {
  }

  findComponent = (param: string) => findComponentInRegistry(param);


  trackWidget(index: number, wiget: any) {
    return wiget ? wiget.id : undefined;
  };

  ngOnInit() {
    this.getOptions();
  }

  ngAfterViewInit() {

  }

  getDashboardData(id: any) {
    this.isLoading = true;
    this._dashboardService.getDefaultDashboards().subscribe((data: any) => {
      this.isLoading = false;
      this.widgetList = [];
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getOptions();

    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }

    if (changes['id'] && this.name) {
      this.getDashboardData(this.name);
    }

    if (this.gridItem && this.gridItem.gridster.curRowHeight > 1) {
      this.unitHeight = this.gridItem.gridster.curRowHeight;
    }
  }

  getItemInputs(item: any) {
    const { uuid, preferences } = item;
    return { uuid, preferences };
  }

  public getOptions() {
    this.options = {
      disablePushOnDrag: true,
      displayGrid: DisplayGrid.Always,
      draggable: {
        enabled: true,
        ignoreContent: true,
        dropOverItems: false,
        dragHandleClass: 'drag-handler',
        ignoreContentClass: 'no-drag',
      },
      emptyCellDragMaxCols: 70,
      emptyCellDragMaxRows: 70,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: true,
      enableEmptyCellDrag: false,
      gridType: GridType.ScrollVertical,
      minCols: 12,
      minRows: 12,
      pushDirections: { north: true, east: true, south: true, west: true },
      pushItems: true,
      resizable: {
        enabled: true,
      },
      //swap: true,
      emptyCellDropCallback: this.onDrop.bind(this),
      itemChangeCallback: this.saveDashboard.bind(this),
      itemResizeCallback: this.itemResize.bind(this),
      setGridSize: true
    };



  }

  public itemResize(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
    itemComponent.gridster.curRowHeight += (item.cols * 100 - item.rows) / 10000;
    if (itemComponent.gridster.curRowHeight > 1) {
      this.unitHeight = itemComponent.gridster.curRowHeight;
      item['unitHeight'] = this.unitHeight;
    }


  }

  onDrop(event: any) {
    const transferredComponentData: IDashboardComponent = JSON.parse(event.dataTransfer.getData('component'));

    const { desc, componentName, icon, hasPreferences } = transferredComponentData;
    const myId = uuid.v4();

    let item: IDashboardWidget = {
      uuid: myId,
      cols: 4,
      rows: 4,
      x: 0,
      y: 0,
      desc: desc,
      name: componentName,
      icon: icon,
      preferences: [],
      hasPreferences: hasPreferences
    }

    this.widgetList.push(item);
    this.updateDashboard();

    //this.saveDashboard()
  }

  onPreferenceSetted(item: IDashboardWidget) {
    let foundComponent = this.widgetList.find(w => w.uuid == item.uuid);

    if (foundComponent) {
      foundComponent.preferences = item.preferences;

      this.saveDashboard()
    }

  }


  onSettings(item: IDashboardWidget) {
    let dynamicComponents = this.dynamicComponents['_results'];

    let component = dynamicComponents.find((c: any) =>
      c.componentRef.instance.uuid == item.uuid
    )

    component?.componentRef.instance.toggleComponentPrefs();
  }


  updateDashboard() {
    let dashboardObj: IDashboard = { id: this.id, name: this.name, widgetList: this.widgetList };
    this.dashboardStore.updateDashboardEffect(dashboardObj);
  }



  onDelete(widget: any) {
    let dialogRef = this.dialogService.openCustomDialog('Are you sure to delete', true);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.widgetList.splice(this.widgetList.indexOf(widget), 1);

        const gridsterPreviewElements = this.elementRef.nativeElement.getElementsByTagName('gridster-preview');
        this.renderer.setStyle(gridsterPreviewElements[0], 'background', '#fafafa');

        setTimeout(() => {
          this.updateDashboard();
        }, 1500);

      }
    })


  }

  saveDashboard() {
    this.updateDashboard();

    //this._dashboardService.saveDashboard(this.id, this.widgets, this.dashboardName).subscribe();
  }

}
