import { useEffect, useState } from "react";


const useWebApp = () => {

    const [webApp, setWebApp] = useState(null);
    useEffect(() => {
        if (window.Telegram === undefined) {
            return;
        }
        const WebApp = window.Telegram.WebApp;
        console.log(WebApp);
        setWebApp(WebApp);
    }, []);

    return webApp;
}

export default useWebApp;