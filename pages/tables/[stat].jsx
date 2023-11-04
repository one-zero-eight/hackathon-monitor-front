import ResizableTable from "@/components/gridTable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useTelegramInitData from "../../hooks/useTelegramInitData";

function Page() {
  const router = useRouter();
  const telegramInitData = useTelegramInitData();
  const [pageCount, setPageCount] = useState(1);
  const [stat_name, setStatName] = useState(null);
  const [target_alias, setTargetAlias] = useState(null);
  const [dataTable, setDataTable] = useState(null);
  const [loading, setLoading] = useState(false);

  const increasePageCount = () => {
    setPageCount(pageCount + 1);
  };

  const decreasePageCount = () => {
    if (pageCount > 1) {
      setPageCount(pageCount - 1);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/stat?stat_name=${stat_name}&limit=${10}&offset=${
          (pageCount - 1) * 10
        }&target_alias=${target_alias}`,
        {
          headers: {
            Authorization: `Bearer ${telegramInitData}`,
          },
        },
      );
      if (response.ok) {
        const data = await response.json();
        setDataTable(data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("An error occurred", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(pageCount);
  }, [pageCount]);

  useEffect(() => {
    if (dataTable) console.log(dataTable);
  }, [dataTable]);

  useEffect(() => {
    if (router.query.stat && router.query.target_alias) {
      setStatName(router.query.stat);
      setTargetAlias(router.query.target_alias);
    }
  }, [router.query.stat, router.query.target_alias]);

  useEffect(() => {
    if (stat_name && target_alias) {
      console.log(stat_name, target_alias);
      fetchData();
    }
  }, [stat_name, pageCount, target_alias]);

  return (
    <>
      <div className=" overflow-x-hidden">
        <h1 className="mt-2 text-xs">{stat_name}</h1>
        <div className="join mb-3 mt-3 grid grid-cols-2">
          <button
            onClick={decreasePageCount}
            disabled={loading || pageCount === 1}
            className="join-item btn btn-outline"
          >
            Previous page
          </button>
          <button
            onClick={increasePageCount}
            disabled={loading || (dataTable && dataTable.length !== 10)}
            className="join-item btn btn-outline"
          >
            Next
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : dataTable ? (
          <ResizableTable offset={pageCount - 1} data={dataTable} />
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </>
  );
}

export default Page;
