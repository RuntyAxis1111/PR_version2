import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { SocialMediaMention } from '../types/data';
import { ExternalLink } from 'lucide-react'; // Removed ThumbsUp, MessageSquare, Share2

interface DataTableProps {
  data: SocialMediaMention[];
  loading: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ data, loading }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Platform',
        accessor: 'platform',
        Cell: ({ value }: { value: string }) => (
          <div className="font-medium">{value}</div>
        ),
      },
      {
        Header: 'Date',
        accessor: 'post_date',
        Cell: ({ value }: { value: string }) => (
          <div>{format(new Date(value), 'MMM d, yyyy')}</div>
        ),
      },
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Content',
        accessor: 'content',
        Cell: ({ value }: { value: string }) => (
          <div className="max-w-md truncate">{value}</div>
        ),
      },
      {
        Header: 'Desktop Reach', // New column header
        accessor: 'desktop_reach', // Use the new data property
        Cell: ({ value }: { value: number }) => (
          <div className="text-right">{value.toLocaleString()}</div>
        ),
      },
      {
        Header: 'Mobile Reach', // New column header
        accessor: 'mobile_reach', // Use the new data property
        Cell: ({ value }: { value: number }) => (
          <div className="text-right">{value.toLocaleString()}</div>
        ),
      },
      // Removed Engagement column
      {
        Header: 'Country',
        accessor: 'country',
      },
      {
        Header: 'Sentiment',
        accessor: 'sentiment',
        Cell: ({ value }: { value: 'Positive' | 'Neutral' | 'Negative' }) => {
          const colorClass = 
            value === 'Positive' ? 'bg-green-100 text-green-800 border-green-300' :
            value === 'Neutral' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
            'bg-red-100 text-red-800 border-red-300';
          
          return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
              {value}
            </span>
          );
        },
      },
      {
        Header: 'Link',
        accessor: 'url',
        Cell: ({ value }: { value: string }) => (
          <a 
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 w-full flex justify-center items-center h-96">
        <div className="animate-pulse text-gray-500">Loading data...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 w-full flex justify-center items-center h-96">
        <div className="text-gray-500">No results found. Try adjusting your filters.</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white shadow-md rounded-lg overflow-hidden w-full"
    >
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <span className="text-sm text-gray-700 mr-4">
              Page{' '}
              <span className="font-medium">{pageIndex + 1}</span> of{' '}
              <span className="font-medium">{pageOptions.length}</span>
            </span>
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
              }}
              className="text-sm border-gray-300 rounded-md"
            >
              {[10, 20, 30, 40, 50].map(size => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'<<'}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'<'}
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'>'}
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {'>>'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DataTable;
