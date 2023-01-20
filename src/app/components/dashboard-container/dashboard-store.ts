import { Injectable } from '@angular/core';
import { EMPTY, Observable, switchMap, pipe, take } from 'rxjs';
import { catchError, concatMap, debounce, debounceTime, withLatestFrom, } from 'rxjs/operators';
import { IDashboard } from '../../models/dashboard';
import { DashboardService } from '../../services/dashboard.service';
import { ComponentStore, OnStateInit, tapResponse } from '@ngrx/component-store';




export interface DashboardContainerState {
  dashboards: IDashboard[];
  selectedDashboard: IDashboard;
}


export const defaultState: DashboardContainerState = {
  dashboards: [],
  selectedDashboard: { id: "1", name: "Dashboard 1", widgetList: [] },
}

@Injectable()
export class DashboardStore extends ComponentStore<DashboardContainerState> {

  constructor(private dashboardService: DashboardService) {
    super(defaultState)
  }

  // SELECTORS
  readonly stateData$ = this.select(state => state)

  readonly dashboards$ = this.select(({ dashboards }) => dashboards);

  readonly selectedDashboard$ = this.select((state) => state.selectedDashboard);



  // UPDATERS

  readonly loadDashboards = this.updater((state, dashboards: IDashboard[] | null) => ({
    ...state,
    dashboards: dashboards || [],
  }));

  readonly updateSelectedDashboard = this.updater((state, selectedDashboard: IDashboard) => ({
    ...state,
    selectedDashboard: selectedDashboard,
    dashboards: state.dashboards.map((t) => (t.id === selectedDashboard.id ? { ...selectedDashboard } : t)),
  }));


  readonly updateAllDashboards = this.updater((state, dashboards: IDashboard[]) => ({
    ...state,
    dashboards: dashboards
  }));


  updateStorage(selectedDashboard: IDashboard) {
    this.state$.pipe(
      debounceTime(500)
    ).subscribe(state => {
      let dashboards = state.dashboards.map((t) => (t.id === selectedDashboard.id ? { ...selectedDashboard } : t))
      let value = { dashboards: dashboards, selectedDashboard: selectedDashboard }
      localStorage.setItem('dashboards', JSON.stringify(value))
    })
  }





  // EFFECTS
  readonly updateDashboardEffect = this.effect((dashboardData$: Observable<IDashboard>) => {
    return dashboardData$.pipe(
      switchMap((data: IDashboard) => this.dashboardService.updateDashboard(data).pipe(
        tapResponse(
          (resp) => { this.updateSelectedDashboard(data), this.updateStorage(data) },
          (error: Error) =>
            console.log("Error")
          //this.patchState({ error: error.message, loading: false })
        )
      )
      )
    )
  });


  restoreToDefaults() {
    localStorage.removeItem('dashboards');
    this.setState(defaultState);
  }


  readonly updateDashboardsEffect = this.effect((dashboardData$: Observable<IDashboard[]>) => {
    return dashboardData$.pipe(
      switchMap((data: IDashboard[]) => this.dashboardService.updateAllDashboards(data).pipe(
        tapResponse(
          (resp) => { this.updateAllDashboards(data) },
          (error: Error) =>
            console.log("Error")
          //this.patchState({ error: error.message, loading: false })
        )
      )
      )
    )
  });


}





