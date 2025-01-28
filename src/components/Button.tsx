import React, { ReactNode } from "react";
import { useAppDispatch } from "../app/storeHooks.ts";

interface ButtonProps {
    children: ReactNode;
    action: any;
    className?: string;
}

function Button({ children, action, className }: ButtonProps) {
    const dispatch = useAppDispatch();

    function handleAction() {
        if (typeof action === 'function') {
            action();
        } else {
            dispatch(action);
        }
    }

    return (
        <button className={`${className ? className : ''} btn`} onClick={handleAction}>{children}</button>
    );
}

export default Button;