export type MenuType = {
    id: number;
    title: string;
    price: number;
    description: string;
    type: "meat" | "fish" | "vegetarian";
}

export type CartItemType = MenuType & { quantity: number };