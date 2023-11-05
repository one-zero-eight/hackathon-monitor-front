import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "rsuite/dist/rsuite.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div data-theme="mytheme" className="min-h-screen px-2">
        <Component {...pageProps} />
      </div>
    </>
  );
}
