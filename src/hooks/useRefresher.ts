import { useState, useEffect } from "react"
export const useRefresher = () =>{
    const [, setFake] = useState<boolean>(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setFake((f:boolean) => !f);
        }, 6000);
        return () => {
            clearInterval(interval);
        };
    }, []);
}