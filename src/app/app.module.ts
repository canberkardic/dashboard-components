import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DynamicModule } from 'ng-dynamic-component';
import { GridsterModule } from 'angular-gridster2';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { FormsModule } from '@angular/forms';
import { DummyComponent } from './components/dummy/dummy.component';
import { AnotherComponent } from './components/another/another.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardContainerComponent,
    DummyComponent,
    AnotherComponent
  ],
  imports: [
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DynamicModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    GridsterModule,
    HttpClientModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
