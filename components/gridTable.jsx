import React, { useEffect, useState } from 'react';

const ResizableTable = ({ offset, data }) => {
    const [tableData, setTableData] = useState(data);

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const columns = tableData.length > 0 ? Object.keys(tableData[0]) : [];

    return (
        <div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th></th>
                        {columns.map((column) => (
                            <th key={column}>
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <th>{offset * 10 + index + 1}</th>
                            {columns.map((column) => (
                                <td key={column}>
                                    {row[column]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        {columns.map((column) => (
                            <th key={column}>
                                {column}
                            </th>
                        ))}
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ResizableTable;
