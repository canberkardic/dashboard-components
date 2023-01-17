import { Input } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import { IDashboardComponentProps } from 'src/app/models/dashboard-component';
import { DashboardComponentDec } from 'src/app/services/decorator/decorator-helpter';


@DashboardComponentDec({
  desc: 'RandomComponentDesc',
  icon: './assets/sidenav-icons/K.png',
  componentName: 'RandomComponent',
  component: RandomComponent
})



@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.scss']
})
export class RandomComponent implements IDashboardComponentProps {
  toggleComponentPrefs: () => void;
  showPreferences: boolean = true;

  @Input()
  public componentUuid: any;

  @Input()
  public preferences: any;

  @Output()
  preferenceSetted = new EventEmitter<string>();
}
