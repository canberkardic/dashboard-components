import { IDashboardComponent, IDashboardComponentProps } from "src/app/models/dashboard-component";


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
    return function <T extends new (...args: any) => IDashboardComponentProps>(target: T) {
        COMPONENT_REGISTRY.push(options)
    }
}

