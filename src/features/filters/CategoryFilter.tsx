import React, { JSX } from "react";

interface CategoryFilterProps {
    type: string;
    active: boolean;
}

function CategoryFilter({ type, active }: CategoryFilterProps): JSX.Element {
    function handleScrollToType(): void {
        const element = document.getElementById(type);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    return (
        <div className={`category-filter ${active ? "current-type" : ""}`}>
            <button onClick={handleScrollToType}>
                {type}
            </button>
        </div>
    );
};
export default CategoryFilter;