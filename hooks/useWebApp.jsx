import { useEffect, useState } from "react";


const useWebApp = () => {

    const [webApp, setWebApp] = useState(null);
    useEffect(() => {
        const WebApp = window.Telegram.WebApp;
        setWebApp(WebApp);
    }, []);

    return webApp;
}

export default useWebApp;
