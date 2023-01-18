import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDashboardComponentProps } from 'src/app/models/dashboard-component';
import { DashboardComponentDec } from 'src/app/shared/decorator/dashboard-component-decorator';


@DashboardComponentDec({
  desc: 'RandomComponentDesc',
  icon: './assets/sidenav-icons/K.png',
  componentName: 'RandomComponent',
  component: RandomComponent,
  hasPreferences: false
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
  public uuid: any;

  @Input()
  public preferences: any;

  @Output()
  preferenceSetted = new EventEmitter<string>();
}
