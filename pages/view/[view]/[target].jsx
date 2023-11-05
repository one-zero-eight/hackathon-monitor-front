import ResizableTable from "@/components/gridTable";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import useTelegramInitData from "../../../hooks/useTelegramInitData";

function Page() {
  const router = useRouter();
  const telegramInitData = useTelegramInitData();
  const [page, setPage] = useState(1);

  const {
    data: swrData,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/views/execute/${
      router.query.view
    }?target_alias=${router.query.target}&limit=${10}&offset=${
      (page - 1) * 10
    }`,
    (url) =>
      fetch(url, {
        headers: {
          Authorization: `Bearer ${
            telegramInitData.initData || process.env.NEXT_PUBLIC_AUTH_STRING
          }`,
        },
      }).then((res) => res.json()),
  );

  const data = !swrData || swrData.detail ? undefined : swrData;

  return (
    <div className="overflow-x-hidden">
      <h1 className="mt-2 text-xs">База данных: {router.query.target}</h1>
      <h1 className="mt-2 text-xs">Отображение: {router.query.view}</h1>
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
