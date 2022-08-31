import { PropsWithChildren } from 'react';
import { Column, TableOptions, useGlobalFilter, useRowSelect, useSortBy, useTable } from 'react-table';
import styles from './Table.module.css';

interface IProps<T extends {}> {
  columns: Column<T>[];
}

const Table = <T extends {}>({
  columns,
  children,
  ...tableOptions
}: IProps<T> & TableOptions<T> & PropsWithChildren) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } = useTable(
    {
      columns,
      ...tableOptions,
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect
  );

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        type="text"
        placeholder="Search Characters..."
        onChange={(e) => setGlobalFilter(e.target.value || '')}
      />
      {children}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            const isSelected =
              tableOptions.initialState?.selectedRowIds && tableOptions.initialState?.selectedRowIds[row.id];

            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className={isSelected ? styles.selected : undefined}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
