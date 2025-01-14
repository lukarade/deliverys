export type MenuType = {
    id: number;
    title: string;
    price: number;
    description: string;
    type: "meat" | "fish" | "vegetarian";
    favorite: boolean;
}

export type CartItemType = MenuType & { quantity: number };

// export type MenuFilterType = {
//     type: "meat" | "fish" | "vegetarian";
//     sort: "asc" | "desc";
//     is
// }