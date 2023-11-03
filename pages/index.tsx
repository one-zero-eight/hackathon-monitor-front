import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { useEffect } from "react";
import useWebApp from "@/hooks/useWebApp";

function Home() {
  const webApp = useWebApp();

  useEffect(() => {
    if (webApp) {
      console.log("webApp", webApp);
    }
  }, [webApp]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h1 className="text-center text-5xl font-bold">Hello ween</h1>

    </main>
  );
}

export default Home;
