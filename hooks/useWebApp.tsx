import { useEffect, useState } from "react";

export default function useWebApp() {
  const [data, setData] = useState<WebApp | undefined>(undefined);

  useEffect(() => {
    setData(window.Telegram.WebApp);
  }, []);

  return data;
}
