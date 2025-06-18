import React from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { SocialMediaMention } from '../types/data';
import { ExternalLink, Eye, Globe, TrendingUp } from 'lucide-react';

interface DataTableProps {
  data: SocialMediaMention[];
  loading: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ data, loading }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'post_date',
        Cell: ({ value }: { value: string }) => {
          try {
            return <div className="font-medium text-gray-900">{format(new Date(value), 'MMM d, yyyy')}</div>;
          } catch {
            return <div className="font-medium text-gray-900">{value}</div>;
          }
        },
      },
      {
        Header: 'Source',
        accessor: 'username',
        Cell: ({ value }: { value: string }) => (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Globe className="h-4 w-4 text-blue-600" />
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">{value}</div>
            </div>
          </div>
        ),
      },
      {
        Header: 'Headline',
        accessor: 'content',
        Cell: ({ value }: { value: string }) => (
          <div className="max-w-md">
            <div className="text-sm text-gray-900 line-clamp-2">{value}</div>
          </div>
        ),
      },
      {
        Header: 'Reach',
        accessor: 'reach',
        Cell: ({ value }: { value: number }) => (
          <div className="flex items-center">
            <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-sm font-semibold text-gray-900">
              {value.toLocaleString()}
            </span>
          </div>
        ),
      },
      {
        Header: 'Country',
        accessor: 'country',
        Cell: ({ value }: { value: string }) => (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {value}
          </span>
        ),
      },
      {
        Header: 'Language',
        accessor: 'language',
        Cell: ({ value }: { value: string }) => (
          <span className="text-sm text-gray-600">{value}</span>
        ),
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
          value ? (
            <a 
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <span className="text-gray-400">-</span>
          )
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
      initialState: { pageIndex: 0, pageSize: 15 },
    },
    useSortBy,
    usePagination
  );

  if (loading) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-8 w-full flex justify-center items-center h-96">
        <div className="flex flex-col items-center">
          <div className="animate-pulse">
            <Eye className="h-8 w-8 text-blue-500 mb-4" />
          </div>
          <div className="text-gray-600 font-medium">Loading PR data...</div>
          <div className="text-sm text-gray-400 mt-1">Please wait while we fetch the latest mentions</div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-xl p-8 w-full flex justify-center items-center h-96">
        <div className="text-center">
          <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <div className="text-gray-600 font-medium mb-2">No PR mentions found</div>
          <div className="text-sm text-gray-400">Try adjusting your filters to see more results</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-xl overflow-hidden w-full border border-gray-200"
    >
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">PR Mentions</h3>
        <p className="text-sm text-gray-600 mt-1">
          Showing {page.length} of {data.length} total mentions
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.render('Header')}</span>
                      <span className="text-gray-400">
                        {column.isSorted
                          ? column.isSortedDesc
                            ? '↓'
                            : '↑'
                          : '↕'}
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
                <motion.tr 
                  {...row.getRowProps()} 
                  className="hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {row.cells.map(cell => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm"
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Enhanced Pagination */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">
            Page <span className="font-medium">{pageIndex + 1}</span> of{' '}
            <span className="font-medium">{pageOptions.length}</span>
          </span>
          <select
            value={pageSize}
            onChange={e => setPageSize(Number(e.target.value))}
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {[10, 15, 25, 50].map(size => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            First
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="relative inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Last
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DataTable;