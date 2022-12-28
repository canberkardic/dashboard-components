import { animate, state, style, transition, trigger } from '@angular/animations';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import { DashboardComponentDec, IDashboardComponentActions } from 'src/app/services/decorator/decorator-helpter';
import { myAnimation } from 'src/app/shared/common-animations';



@DashboardComponentDec({
  desc: 'AnotherDesc',
  icon: './assets/sidenav-icons/A.png',
  componentName: 'AnotherComp',
  component: AnotherComponent,
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in'))
    ])
  ]
})

@Component({
  selector: 'app-another',
  templateUrl: './another.component.html',
  styleUrls: ['./another.component.scss'],
})
export class AnotherComponent implements IDashboardComponentActions {
  kind: string = "data";

  @Input()
  public componentUuid: any;

  @Input()
  public preferences: any;

  @Output()
  preferenceSetted = new EventEmitter<string>();

  showPreferences: boolean;

  toggleComponentPrefs() {

    this.showPreferences = !this.showPreferences;

  }

  show = false;



  get stateName() {
    return this.show ? 'show' : 'hide'
  }


  toggle() {
    this.show = !this.show;
  }

}
