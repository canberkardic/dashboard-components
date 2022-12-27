import { Component, OnInit } from '@angular/core';
import { DashboardComponentDec } from 'src/app/services/decorator/decorator-helpter';


@DashboardComponentDec({
  desc: 'DummyDesc',
  icon: './assets/img/sidenav-icons/graph.png',
  componentName: 'DummyComponent',
  component: DummyComponent
})

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})

export class DummyComponent implements OnInit {
  ngOnInit(): void {

  }

}


