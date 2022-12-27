import { Component } from '@angular/core';
import { DashboardComponentDec } from 'src/app/services/decorator/decorator-helpter';

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
export class AnotherComponent {

}
