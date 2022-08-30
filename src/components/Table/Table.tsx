import { Column, TableOptions, useGlobalFilter, useRowSelect, useSortBy, useTable } from 'react-table';
import styles from './Table.module.css';

interface IProps<T extends {}> {
  columns: Column<T>[];
}

const Table = <T extends {}>({ columns, ...tableOptions }: IProps<T> & TableOptions<T>) => {
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
              <tr {...row.getRowProps()} className={row.isSelected ? styles.selected : undefined}>
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
