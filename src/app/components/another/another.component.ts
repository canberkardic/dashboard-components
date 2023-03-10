import { animate, style, transition, trigger } from '@angular/animations';
import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import { IDashboardComponentProps } from 'src/app/models/dashboard-component';
import { DashboardComponentDec } from 'src/app/shared/decorator/decorator-helpter';

const enterTransition = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('1s ease-in', style({
    opacity: 1
  }))
]);

const leaveTrans = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('1s ease-out', style({
    opacity: 0
  }))
])

export const fadeIn = trigger('fadeIn', [
  enterTransition
]);

export const fadeOut = trigger('fadeOut', [
  leaveTrans
]);

@DashboardComponentDec({
  desc: 'AnotherDesc',
  icon: './assets/sidenav-icons/A.png',
  componentName: 'AnotherComp',
  component: AnotherComponent,
})

@Component({
  selector: 'app-another',
  templateUrl: './another.component.html',
  styleUrls: ['./another.component.scss'],
  animations: [
    fadeIn,
    fadeOut,
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ],
})
export class AnotherComponent implements IDashboardComponentProps {

  @Input()
  public uuid: any;

  @Input()
  public preferences: any;

  @Output()
  preferenceSetted = new EventEmitter<string>();

  showPreferences: boolean;

  toggleComponentPrefs() {

    this.showPreferences = !this.showPreferences;

  }

}
