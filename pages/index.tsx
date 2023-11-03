import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { useEffect } from "react";
import useTelegramInitData from "@/hooks/useTelegramInitData";
import useWebApp from "@/hooks/useWebApp";

function Home() {
  const webApp = useWebApp();
  const telegramInitData = useTelegramInitData();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-center text-5xl font-bold">Hello world!</h1>
      <div>
        <p className="text-center text-3xl font-bold">WebApp: {JSON.stringify(webApp, null, 2)}</p>
      </div>

      <div>
        <p className="text-center text-3xl font-bold">
          TelegramInitData: {JSON.stringify(telegramInitData, null, 2)}
        </p>
      </div>


    </main>
  );
}

export default Home;
