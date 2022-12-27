import { NgClass } from '@angular/common';
import { ViewContainerRef } from '@angular/core';
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import 'reflect-metadata';

const metadataKey = Symbol('DashboardComponentDec');

export interface IDashboardComponent {
    desc?: string,
    icon: string,
    componentName: string,
    component: any
}

export function getFilteredProperties2(origin: any): object {
    const properties: string[] = Reflect.getMetadata(metadataKey, origin);
    const result: any = {};
    if (properties) {


        properties.forEach(key => result[key] = origin[key]);

    }
    return result;

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


