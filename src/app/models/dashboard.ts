import { GridsterItem } from "angular-gridster2";

export interface IDashboard {
    id: string;
    name: string;
    widgetList: Array<IDashboardWidget>;
}

// Dropped item becomes a dashboard widget
export interface IDashboardWidget extends GridsterItem {
    uuid: string;
    name: string;
    widget?: string;
    hasPreferences: boolean;
    preferences: any;
}