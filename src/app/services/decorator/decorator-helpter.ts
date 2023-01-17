import { IDashboardComponent, IDashboardComponentActions } from "src/app/models/models";

const COMPONENT_REGISTRY: IDashboardComponent[] = [];

export function getDashboardComponents(): IDashboardComponent[] {
    return COMPONENT_REGISTRY;
}


export function findComponentInRegistry(param: string) {
    let data = getDashboardComponents();

    let c = data.find((d: IDashboardComponent) => d.componentName == param);
    return c?.component;
}

export function DashboardComponentDec(options: IDashboardComponent) {
    return function <T extends new (...args: any) => IDashboardComponentActions>(target: T) {
        COMPONENT_REGISTRY.push(options)
    }
}

