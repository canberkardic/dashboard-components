import { IDashboardComponent, IDashboardComponentProps } from "src/app/models/dashboard-component";
import { COMPONENT_REGISTRY } from "./dashboard-component-decorator-helper";

export function DashboardComponentDec(options: IDashboardComponent) {
    return function <T extends new (...args: any) => IDashboardComponentProps>(target: T) {
        COMPONENT_REGISTRY.push(options)
    }
}

