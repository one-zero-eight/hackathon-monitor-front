import { useRouter } from "next/router";
import { useState } from "react";

function Page() {
  const router = useRouter();
  const { target } = router.query;
  const [from, setFrom] = useState("now-1h");
  const [to, setTo] = useState("now");
  const url = `${process.env.NEXT_PUBLIC_GRAFANA_URL}/d/000000039/postgresql-database?orgId=1&refresh=5s&from=${from}&to=${to}&var-target=${router.query.target}&kiosk`;

  return (
    <div className="h-screen">
      <h1 className="mt-2 text-xs">База данных: {target}</h1>
      <iframe src={url} className="h-full w-full" />
    </div>
  );
}

export default Page;
