type TClass = { new(...args: any[]): any; }; // Indicates that, this must be a class

import { InputDecorator } from "@angular/core";
import { EventEmitter } from "@angular/core";


export interface IDashboardComponent {
    desc?: string;
    icon: string;
    componentName: string;
    component: TClass;
}


export interface IDashboardComponentProps {
    uuid: InputDecorator;
    preferences: InputDecorator;
    preferenceSetted: EventEmitter<string>
    showPreferences: boolean;
    toggleComponentPrefs(): void
}
