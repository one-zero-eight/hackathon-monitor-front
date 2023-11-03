import { Head, Html, Main, NextScript } from "next/document";
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <script src="https://telegram.org/js/telegram-web-app.js" defer></script>

      </Head>
      <body>
        <noscript className="flex w-full justify-center bg-red-700 p-8">
          You need to enable JavaScript to run this app.
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
