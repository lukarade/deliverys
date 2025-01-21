import { MenuType } from "../types/types";

function groupMenusByType(menus: MenuType[]): { [key: string]: MenuType[] } {
    return menus.reduce((acc, menu) => {
        if (!acc[menu.type]) {
            acc[menu.type] = [];
        }
        acc[menu.type].push(menu);
        return acc;
    }, {});
}

function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export { groupMenusByType, capitalizeFirstLetter };