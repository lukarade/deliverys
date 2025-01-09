import React, { ReactNode } from "react";
import { useAppDispatch } from "../app/storeHooks.ts";

interface ButtonProps {
    children: ReactNode;
    action: any;
    className?: string;
}

function Button({ children, action, className }: ButtonProps) {
    const dispatch = useAppDispatch();

    return (
        <button className={`${className ? className : ''} btn`} onClick={() => dispatch(action)}>{children}</button>
    );
}

export default Button;