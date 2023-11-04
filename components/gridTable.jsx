import React from 'react';
import { useEffect } from 'react';

const ResizableTable = ({ offset, data }) => {

    const [dataT, setDataT] = React.useState(data);

    const columns = Object.keys(dataT[0]).map((key) => ({
        id: key,
        name: key,
    }));


    useEffect(() => {
        setDataT(data)
    }, [data])


    return (
        <div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th></th>
                        {
                            columns.map((column) => (
                                <th key={column.id}>
                                    {column.name}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        dataT.map((row, index) => (
                            <tr key={index}>
                                <th>{offset * 10 + index + 1}</th>
                                {
                                    columns.map((column) => (
                                        <td key={column.id}>
                                            {row[column.id]}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        {
                            columns.map((column) => (
                                <th key={column.id}>
                                    {column.name}
                                </th>
                            ))
                        }
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default ResizableTable;
