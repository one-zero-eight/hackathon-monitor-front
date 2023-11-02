import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head />
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
