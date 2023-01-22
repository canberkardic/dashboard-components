import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse, OnStateInit, OnStoreInit } from '@ngrx/component-store';
import { Observable, switchMap, pipe } from 'rxjs';
import { debounce, debounceTime, exhaustMap, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import { IDashboard } from '../../models/dashboard';
import { DashboardService } from '../../services/dashboard.service';




export interface DashboardContainerState {
  dashboards: IDashboard[];
  selectedDashboard: IDashboard;
  loading: boolean;
  error?: string;
}


export const defaultState: DashboardContainerState = {
  dashboards: [],
  selectedDashboard: { id: "1", name: "Dashboard 1", widgetList: [] },
  loading: true
}

@Injectable()
export class DashboardStore extends ComponentStore<DashboardContainerState> implements OnStateInit, OnStoreInit {

  constructor(private dashboardService: DashboardService) {
    super()
  }

  ngrxOnStoreInit() {
    this.setState(defaultState);
  }

  ngrxOnStateInit() {
    this.initializeStoreData();
  }


  private initializeStoreData() {
    // Check for cache
    let data = localStorage.getItem('dashboards');
    if (data) {
      let dashboardData = JSON.parse(data);
      this.setState(dashboardData);
      this.patchState({ loading: false });
    } else {
      this.getDashboards();
    }
  }


  private updateStorage(selectedDashboard: IDashboard) {
    this.state$.pipe(
      debounceTime(500)
    ).subscribe(state => {
      let dashboards = state.dashboards.map((t) => (t.id === selectedDashboard.id ? { ...selectedDashboard } : t))
      let value = { dashboards: dashboards, selectedDashboard: selectedDashboard }
      localStorage.setItem('dashboards', JSON.stringify(value))
    })
  }


  restoreToDefaults() {
    localStorage.removeItem('dashboards');
    this.getDashboards();
  }

  // SELECTORS
  readonly stateData$ = this.select(state => state)

  readonly dashboards$ = this.select(({ dashboards }) => dashboards);

  readonly selectedDashboard$ = this.select((state) => state.selectedDashboard);

  private readonly isLoading$ = this.select((state) => state.loading);

  private readonly error$ = this.select((state) => state.error);

  readonly vm$ = this.select(
    {
      dashborads: this.dashboards$,
      selectedDashboard: this.selectedDashboard$,
      loading: this.isLoading$,
      error: this.error$,
    },
    { debounce: true }
  );

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




  // EFFECTS
  readonly getDashboards = this.effect<void>(
    pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() => this.dashboardService.getDefaultDashboards().pipe(
        tapResponse(
          // success logic
          (dashboards: IDashboard[]) => {
            this.patchState({ dashboards, selectedDashboard: dashboards[0], loading: false })
          },
          // failure logic
          (error: Error) =>
            this.patchState({ error: error.message, loading: false })
        )
      )
      )
    )
  );

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





