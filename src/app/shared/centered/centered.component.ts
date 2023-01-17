import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'centered',
  template: `
  
  <span class="itemContainer">
    <ng-content select="[prefix]"></ng-content>
    <ng-content select="[body]"></ng-content>
    <ng-content select="[suffix]"></ng-content>
  </span>

`,
  styles: [
    `
    .itemContainer{
      display:flex;
      justify-content:center;
      align-items:center;
      gap:10px;
    }
    `

  ],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CenteredComponent {

}
