import { Component, OnInit } from '@angular/core';
import { DummyComponent } from './components/dummy/dummy.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dashboard-components';

  ngOnInit() {

  }

}
