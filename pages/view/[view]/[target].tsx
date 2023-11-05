import ResizableTable from "@/components/gridTable";
import fetcher from "@/hooks/fetcher";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import useWebApp from "../../../hooks/useWebApp";

function Page() {
  const webApp = useWebApp();
  const router = useRouter();
  const { view, target } = router.query;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 10;

  const { data, error, isLoading } = useSWR(
    [
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/views/execute/${view}?target_alias=${target}&limit=${10}&offset=${offset}`,
      webApp?.initData,
    ],
    ([url, auth]) => fetcher(url, auth),
  );

  return (
    <div className="overflow-x-hidden">
      <h1 className="mt-2 text-xs">База данных: {target}</h1>
      <h1 className="mt-2 text-xs">Отображение: {view}</h1>
      <div className="join mb-3 mt-3 grid grid-cols-2">
        <button
          onClick={() => {
            setPage((v) => v + 1);
          }}
          disabled={isLoading || page === 1}
          className="join-item btn btn-outline"
        >
          Назад
        </button>
        <button
          onClick={() => setPage((v) => (v > 1 ? v - 1 : 0))}
          disabled={isLoading || !data || (data && data.length !== 10)}
          className="join-item btn btn-outline"
        >
          Дальше
        </button>
      </div>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : !error && data ? (
        <ResizableTable offset={page - 1} data={data} />
      ) : (
        <p>Нет данных.</p>
      )}
    </div>
  );
}

export default Page;
