import React from 'react'

function DataTable({ variant = 'default', data = [], columns = [] }) {
  if (variant === 'performance') {
    // Performance-specific table implementation
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/10">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/20">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-primary/5">
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {column.accessor ? row[column.accessor] : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Default table implementation
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-primary/10">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary/20">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-primary/5">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-textPrimary">
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable