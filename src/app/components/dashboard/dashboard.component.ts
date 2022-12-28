/**
 * DashboardComponent
 * The main component that handles the dashboard & its actions
 * @author canberkardic <ardiccanberk@gmail.com>
 */
export interface IDashboardWidget extends GridsterItem {
  componentUuid: string;
  name: string;
  widget: string;
  preferences: any[];
}



import {
  Component, OnInit, Renderer2, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, ViewChild, ViewChildren, QueryList
} from '@angular/core';

import { GridsterConfig, GridType, DisplayGrid, GridsterItemComponent, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import * as uuid from 'uuid';



import { DialogService } from 'src/app/shared/dialog/dialog.service';

import { ErrorDialogService } from 'src/app/shared/error-dialog/error-dialog.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { whoUsedIt } from 'src/app/services/decorator/decorator-helpter';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChildren('component') dynamicComponents!: QueryList<ElementRef>
  @ViewChild('gridsterItem', { static: false }) gridItem!: GridsterItemComponent;

  outputs = {
    preferenceSetted: (item: any) => this.onPreferenceSetted(item)
  }

  @Input()
  dashboardId: any;

  @Input()
  dashboardName: any;

  public options: GridsterConfig;

  public unitHeight!: number; //needed for highcharts resize
  public item!: GridsterItem;

  public widgets: any[] = [];

  public subscription: any

  components = whoUsedIt();
  isLoading: boolean = false;

  showSettingsButton: boolean = true;


  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private _dashboardService: DashboardService,
    private dialogService: DialogService,
    private _errorDialogService: ErrorDialogService
  ) { }


  findComponent(param: any) {
    let data = whoUsedIt();

    let c = data.find((d: any) => d.componentName == param);
    return c.component;
  }

  ngOnInit() {
    this.getOptions();
  }

  ngAfterViewInit() {
    this.getDashboardData(this.dashboardId);
  }

  getDashboardData(dashboardId: any) {
    this.isLoading = true;
    this._dashboardService.getDefaultDashboards().subscribe((data: any) => {
      this.isLoading = false;
      this.widgets = [];
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getOptions();


    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }

    if (changes['dashboardId'] && this.dashboardId) {
      this.getDashboardData(this.dashboardId);
    }



    if (this.gridItem && this.gridItem.gridster.curRowHeight > 1) {
      this.unitHeight = this.gridItem.gridster.curRowHeight;
    }
  }

  getItemInputs(item: any) {
    const { componentUuid, preferences } = item;
    return { componentUuid, preferences };
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


    /**UUID Generation
     See https://bit.ly/37dkPPf
     **/

    const result = event.dataTransfer.getData('component');


    const { desc, componentName, icon } = JSON.parse(result);
    const myId = uuid.v4();

    //let result = this.decoratorService.getDashboardComponent(component);

    let item = {
      componentUuid: myId,
      cols: 4,
      rows: 4,
      desc: desc,
      name: componentName,
      icon: icon,
    }

    this.widgets.push(item);
    //this.saveDashboard()
  }

  onPreferenceSetted(item: any) {
    let foundComponent = this.widgets.find(w => w.componentUuid == item.componentUuid);
    foundComponent.preferences = item.preferences;

    this.saveDashboard()
  }


  onSettings(item: IDashboardWidget) {
    let dynamicComponents = this.dynamicComponents['_results'];



    let component = dynamicComponents.find((c: any) =>
      c.componentRef.instance.componentUuid == item.componentUuid
    );

    component.componentRef.instance.toggleComponentPrefs();
  }



  onDelete(widget: any) {
    let dialogRef = this.dialogService.openCustomDialog('Are you sure to delete', true);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.widgets.splice(this.widgets.indexOf(widget), 1);
        this.saveDashboard()

        const gridsterPreviewElements = this.elementRef.nativeElement.getElementsByTagName('gridster-preview');
        this.renderer.setStyle(gridsterPreviewElements[0], 'background', '#fafafa')
      }
    })
  }

  saveDashboard() {
    //this._dashboardService.saveDashboard(this.dashboardId, this.widgets, this.dashboardName).subscribe();
  }

}
