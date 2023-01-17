import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { IDashboardComponentActions } from 'src/app/models/models';
import { DashboardComponentDec } from 'src/app/services/decorator/decorator-helpter';



@DashboardComponentDec({
  desc: 'DummyDesc',
  icon: './assets/sidenav-icons/graph.png',
  componentName: 'DummyComponent',
  component: DummyComponent
})

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss'],

})

export class DummyComponent implements OnInit, IDashboardComponentActions {


  @Input()
  public componentUuid: any;

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


