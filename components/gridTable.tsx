import React from "react";

const ResizableTable = ({ offset, data }: { offset: number; data: any[] }) => {
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="overflow-x-auto">
      <table className="table-xs table">
        <thead>
          <tr>
            <th></th>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <th>{offset * 10 + index + 1}</th>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ResizableTable;
