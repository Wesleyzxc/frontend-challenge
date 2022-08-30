import { useMemo } from 'react';
import { Column, CellProps } from 'react-table';
import { characterData } from '../../data/characters';
import { AbilityName, Character, CharacterAbility, CharacterTag } from '../../types';
import Profile from '../Profile/Profile';
import Table from './Table';
import styles from './CharacterTable.module.css';

const AbilityCell = ({ value }: CellProps<Character>) => (
  <b className={(styles.center, value === 10 ? styles.red : undefined)}>{value}</b>
);

const CharacterTable = () => {
  const getAbilityScore = (abilities: CharacterAbility[], abilityToSearch: AbilityName) =>
    abilities.find((ability) => ability.abilityName === abilityToSearch)?.abilityScore ?? 0;
  const columns: Column<Character>[] = useMemo(
    () => [
      {
        accessor: 'name',
        Cell: ({ value, row: { original } }: CellProps<Character>) => {
          return (
            <div className={styles.character}>
              <input type="checkbox" />
              <Profile size={40} name={original.name} src={original.thumbnail ?? original.image} />
              <b>{value}</b>
            </div>
          );
        },
        Header: 'Character',
      },
      {
        accessor: (originalRow) => originalRow.tags?.map((tag) => tag.tag_name).join(', '),
        Header: 'Tags',
        // todo pill
        Cell: ({ value }: CellProps<Character>) => <div>{value}</div>,
      },
      {
        accessor: (originalRow) => getAbilityScore(originalRow.abilities, 'Power'),
        Header: 'Power',
        id: 'power',
        Cell: AbilityCell,
      },
      {
        accessor: (originalRow) => getAbilityScore(originalRow.abilities, 'Mobility'),
        Header: 'Mobility',
        id: 'mobility',
        Cell: AbilityCell,
      },
      {
        accessor: (originalRow) => getAbilityScore(originalRow.abilities, 'Technique'),
        Header: 'Technique',
        id: 'technique',
        Cell: AbilityCell,
      },
      {
        accessor: (originalRow) => getAbilityScore(originalRow.abilities, 'Survivability'),
        Header: 'Survivability',
        id: 'survivability',
        Cell: AbilityCell,
      },
      {
        accessor: (originalRow) => getAbilityScore(originalRow.abilities, 'Energy'),
        Header: 'Energy',
        id: 'energy',
        Cell: AbilityCell,
      },
    ],
    []
  );

  return <Table columns={columns} data={characterData} />;
};

export default CharacterTable;
