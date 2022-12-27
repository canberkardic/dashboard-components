import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DialogService } from '../shared/dialog/dialog.service';


export interface IDashboard {
  dashboardId: string;
  name: string;
  widgets: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly DEFAULT_DASHBOARDS = 'assets/dashboard-data/default_dashboards.json';

  constructor(
    private _http: HttpClient,
    private dialogService: DialogService,
  ) { }

  getDefaultDashboards(): Observable<any> {
    return this._http.get<IDashboard[]>(this.DEFAULT_DASHBOARDS);
  }

}
