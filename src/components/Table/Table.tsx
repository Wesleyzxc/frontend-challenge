import { Column, TableOptions, useGlobalFilter, useSortBy, useTable } from 'react-table';
import styles from './Table.module.css';

interface IProps<T extends {}> {
  columns: Column<T>[];
}

const Table = <T extends {}>({ columns, data }: IProps<T> & TableOptions<T>) => {
  columns.map((col) => col.disableGlobalFilter);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  return (
    <div className={styles.container}>
      <input type="text" placeholder="Search..." onChange={(e) => setGlobalFilter(e.target.value || '')} />
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
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
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
