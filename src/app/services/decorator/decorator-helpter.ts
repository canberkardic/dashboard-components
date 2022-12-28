import { InputDecorator } from "@angular/core";
import { EventEmitter } from "@angular/core";

export interface IDashboardComponent {
    desc?: string,
    icon: string,
    componentName: string,
    component: any
}

const REGISTRY: any[] = [];


export function whoUsedIt(): any {
    return REGISTRY;
}
export interface IDashboardComponentActions {
    componentUuid: InputDecorator;
    preferences: InputDecorator;
    preferenceSetted: EventEmitter<string>
    showPreferences: boolean;
    toggleComponentPrefs(): void
}

export function DashboardComponentDec(options: any) {
    return function <T extends new (...args: {}[]) => IDashboardComponentActions>(target: T) {
        REGISTRY.push(options)

    }
}

