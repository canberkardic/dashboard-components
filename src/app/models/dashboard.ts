import { GridsterItem } from "angular-gridster2";

// Entity
export interface IDashboard {
    id: string;
    name: string;
    widgets: Array<IDashboardWidget>;
}

// Dropped item becomes a dashboard widget
export interface IDashboardWidget extends GridsterItem {
    componentUuid: string;
    name: string;
    widget?: string;
    preferences: any[];
}