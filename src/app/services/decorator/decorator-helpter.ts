
export interface IDashboardComponent {
    desc?: string,
    icon: string,
    componentName: string,
    component: any
}


const REGISTRY: any[] = [];

export function DashboardComponentDec(componentDefinition: IDashboardComponent): ClassDecorator {
    return function (customComponent) {
        // Component itself
        REGISTRY.push(componentDefinition)

        // Adds a property "ToolboxComponent"
        Object.defineProperty(customComponent, DashboardComponentDec.name, {
            value: componentDefinition
        })
    }
}



export function whoUsedIt(): any {
    return REGISTRY;
}


