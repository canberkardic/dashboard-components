import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import { DashboardComponentDec, IDashboardComponentActions } from 'src/app/services/decorator/decorator-helpter';


@DashboardComponentDec({
  desc: 'AnotherDesc',
  icon: './assets/sidenav-icons/A.png',
  componentName: 'AnotherComp',
  component: AnotherComponent
})

@Component({
  selector: 'app-another',
  templateUrl: './another.component.html',
  styleUrls: ['./another.component.scss']
})
export class AnotherComponent implements IDashboardComponentActions {
  kind: string = "data";

  @Input()
  public componentUuid: any;

  @Input()
  public preferences: any;

  @Output()
  preferenceSetted = new EventEmitter<string>();

}
