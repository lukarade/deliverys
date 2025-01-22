import { useCallback, useEffect, useState } from 'react';

function useCurrentMenuType(types: string[], scrollContainerRef: React.RefObject<HTMLDivElement | null>): string {
    const [currentType, setCurrentType] = useState<string>(types[0]);

    const isCurrentType = useCallback((type: string): boolean => {
        const element = document.getElementById(type);
        if (element) {
            const currentTypePosition = element.getBoundingClientRect();
            return currentTypePosition.top <= 300 + 170; // 170 is the height of the fixed filter header
        }
        return false;
    }, []);

    const checkVisibleType = useCallback((): void => {
        types.forEach((type) => {
            if (isCurrentType(type)) {
                setCurrentType(type);
            }
        });
    }, [types, isCurrentType]);

    useEffect(() => {
        if (types && scrollContainerRef.current) {
            const scrollContainer = scrollContainerRef.current;
            scrollContainer.addEventListener('scroll', checkVisibleType);
            checkVisibleType();

            return () => {
                scrollContainer.removeEventListener('scroll', checkVisibleType);
            };
        }

    }, [types, scrollContainerRef, checkVisibleType]);

    return currentType;
}

export { useCurrentMenuType };