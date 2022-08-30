import { useMemo } from 'react';
import { Column, CellProps } from 'react-table';
import { characterData } from '../../data/characters';
import { Character } from '../../types';
import Table from './Table';

const CharacterTable = () => {
  const columns: Column<Character>[] = useMemo(
    () => [
      {
        accessor: 'name',
        Cell: ({ value }: CellProps<Character>) => <div />,
        Header: 'Character',
      },
      {
        accessor: 'tags',
        Header: 'Tags',
        Cell: ({ value }: CellProps<Character>) => <div />,
      },
      {
        accessor: 'abilities',
        Header: 'Power',
        id: 'power',
        Cell: ({ value }: CellProps<Character>) => <div />,
      },
      {
        accessor: 'abilities',
        Header: 'Mobility',
        id: 'mobility',
        Cell: ({ value }: CellProps<Character>) => <div />,
      },
      {
        accessor: 'abilities',
        Header: 'Technique',
        id: 'technique',
        Cell: ({ value }: CellProps<Character>) => <div />,
      },
      {
        accessor: 'abilities',
        Header: 'Survivability',
        id: 'survivability',
        Cell: ({ value }: CellProps<Character>) => <div />,
      },
      {
        accessor: 'abilities',
        Header: 'Energy',
        id: 'energy',
        Cell: ({ value }: CellProps<Character>) => <div />,
      },
    ],
    []
  );

  return <Table columns={columns} data={characterData} />;
};

export default CharacterTable;
