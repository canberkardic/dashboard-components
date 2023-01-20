import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DialogService } from '../shared/dialog/dialog.service';
import { IDashboard } from '../models/dashboard';




@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly DEFAULT_DASHBOARDS = 'assets/dashboard-data/default_dashboards.json';

  constructor(
    private _http: HttpClient,
    private dialogService: DialogService,
  ) { }

  getDefaultDashboards(): Observable<IDashboard[]> {
    return this._http.get<IDashboard[]>(this.DEFAULT_DASHBOARDS);
  }


  updateDashboard(data: any): Observable<IDashboard[]> {
    return of([]);
  }

  updateAllDashboards(data: any): Observable<IDashboard[]> {
    return of([]);
  }
}

