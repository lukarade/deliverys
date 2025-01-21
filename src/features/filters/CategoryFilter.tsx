import React, { JSX } from "react";

interface CategoryFilterProps {
    type: string;
}

function CategoryFilter({ type }: CategoryFilterProps): JSX.Element {
    function handleScrollToType(): void {
        const element = document.getElementById(type);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
    }

    return (
        <div className="category-filter">
            <button onClick={handleScrollToType}>
                {type}
            </button>
        </div>
    );
};
export default CategoryFilter;