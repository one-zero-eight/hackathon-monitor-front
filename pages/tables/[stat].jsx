import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ResizableTable from "@/components/gridTable";

function Page() {
    const router = useRouter();
    const [pageCount, setPageCount] = useState(1);
    const [stat_name, setStatName] = useState(null);
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
                `/api/stat?stat_name=${stat_name}&limit=${10}&offset=${(pageCount - 1) * 10}`
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
        if (router.query.stat) {
            setStatName(router.query.stat);
        }
    }, [router.query.stat]);

    useEffect(() => {
        if (stat_name) {
            console.log(stat_name);
            fetchData();
        }
    }, [stat_name, pageCount]);

    return (
        <>
            <div>
                <h1 className="mt-2">{stat_name}</h1>
                <div className="join grid grid-cols-2 mt-3 mb-3">
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
