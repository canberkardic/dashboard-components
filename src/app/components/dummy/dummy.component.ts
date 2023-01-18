import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IDashboardComponentProps } from 'src/app/models/dashboard-component';
import { DashboardComponentDec } from 'src/app/shared/decorator/decorator-helpter';



@DashboardComponentDec({
  desc: 'DummyDesc',
  icon: './assets/sidenav-icons/graph.png',
  componentName: 'DummyComponent',
  component: DummyComponent,
  hasPreferences: true
})

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss'],

})

export class DummyComponent implements OnInit, IDashboardComponentProps {


  @Input()
  public uuid: any;

  @Input()
  public preferences: any;

  @Output()
  preferenceSetted = new EventEmitter<string>();

  showPreferences: boolean;


  ngOnInit(): void {

  }

  toggleComponentPrefs(): void {
    this.showPreferences = !this.showPreferences;
  }


}


