import { useState, useEffect } from "react"
export const useRefresher = (time: number = 1200) => {
    const [, setFake] = useState<boolean>(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setFake((f:boolean) => !f);
        }, time);
        return () => {
            clearInterval(interval);
        };
    }, []);
}