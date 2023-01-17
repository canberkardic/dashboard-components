import { InputDecorator } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { GridsterItem } from "angular-gridster2";

type TClass = { new(...args: any[]): any; };

export interface IDashboard {
    id: string;
    name: string;
    widgets: Array<IDashboardWidget>;
}


export interface ISidenavItem {
    id: string
    name: string
    icon: string
    widget: string
}


export interface IDashboardComponent {
    desc?: string;
    icon: string;
    componentName: string;
    component: TClass;
}



export interface IDashboardComponentActions {
    componentUuid: InputDecorator;
    preferences: InputDecorator;
    preferenceSetted: EventEmitter<string>
    showPreferences: boolean;
    toggleComponentPrefs(): void
}

export interface IDashboardWidget extends GridsterItem {
    componentUuid: string;
    name: string;
    widget: string;
    preferences: any[];
}