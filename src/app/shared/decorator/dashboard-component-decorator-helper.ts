import { IDashboardComponent } from "src/app/models/dashboard-component";

export const COMPONENT_REGISTRY: IDashboardComponent[] = [];

export function getDashboardComponents(): IDashboardComponent[] {
    return COMPONENT_REGISTRY;
}


export function findComponentInRegistry(param: string) {
    let data = getDashboardComponents();

    let c = data.find((d: IDashboardComponent) => d.componentName == param);
    return c?.component;
}





