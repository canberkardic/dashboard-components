export interface IDashboardComponent {
  desc?: String,
  icon: String,
  componentName: String,
  component: any
}

import { ViewContainerRef } from '@angular/core';
import { ViewRef } from '@angular/core';
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { DummyComponent } from 'src/app/components/dummy/dummy.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';


@Injectable({
  providedIn: 'root'
})
export class DecoratorService {


  getDashboardComponents() {



    //var allComponentFactories = Array.from(this.componentResolver['_factories'].keys());

    return [{ component: 'DummyComponent' }]
  }

  getDashboardComponent(component: string): any {
    const foundComponent = this.getDashboardComponents()
      .find((f: any) => f.component == component);
    return foundComponent
  }
}
