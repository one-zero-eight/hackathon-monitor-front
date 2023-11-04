import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ResizableTable from "@/components/gridTable"


function Page() {
    const router = useRouter();
    const [pageCount, setPageCount] = useState(1);
    const [stat_name, setStatName] = useState(null);
    const [dataTable, setDataTable] = useState(null);

    const increasePageCount = () => {
        setPageCount(pageCount + 1)
    }

    const decreasePageCount = () => {
        if (pageCount > 1) {
            setPageCount(pageCount - 1)
        }
    }
    useEffect(() => {
        console.log(pageCount);
    }, [pageCount])

    useEffect(() => {
        if (dataTable)
            console.log(dataTable);
    }, [dataTable])

    useEffect(() => {
        if (router.query.stat) {
            setStatName(router.query.stat)
        }
    }, [router.query.stat])

    useEffect(() => {
        if (stat_name) {
            console.log(stat_name);
            fetch(`/api/stat?stat_name=${stat_name}&limit=${10}&offset=${(pageCount - 1) * 10}`).then((res) => res.json()).then((data) => {
                setDataTable(data)
            }
            )
        }
    }, [stat_name, pageCount])

    return (
        <>
            <div>
                <h1>{stat_name}</h1>
                <div className="join grid grid-cols-2">
                    <button onClick={decreasePageCount} className="join-item btn btn-outline">Previous page</button>
                    <button onClick={increasePageCount} disabled={dataTable && dataTable.length != 10} className="join-item btn btn-outline">Next</button>
                </div>
                {dataTable && <ResizableTable offset={pageCount - 1} data={dataTable} />}
            </div>
        </>
    )

}

export default Page;