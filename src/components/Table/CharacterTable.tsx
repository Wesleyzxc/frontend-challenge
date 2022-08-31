import { useCallback, useMemo } from 'react';
import { Column, CellProps } from 'react-table';
import { characterData } from '../../data/characters';
import { AbilityName, Character, CharacterAbility } from '../../types';
import Profile from '../Profile/Profile';
import Table from './Table';
import styles from './CharacterTable.module.css';

const AbilityCell = ({ value }: CellProps<Character>) => (
  <b className={(styles.center, value === 10 ? styles.red : undefined)}>{value}</b>
);

interface ICharacterTableProps {
  teamProfiles: Character[];
  setTeamProfiles: React.Dispatch<React.SetStateAction<Character[]>>;
}

const CharacterTable = ({ teamProfiles, setTeamProfiles }: ICharacterTableProps) => {
  const onClick = useCallback(
    (clicked: Character, add: boolean) => {
      add
        ? setTeamProfiles((profiles) => [...profiles, clicked])
        : setTeamProfiles((profiles) => profiles.filter((profile) => profile.id !== clicked.id));
    },
    [setTeamProfiles]
  );

  const getAbilityScore = (abilities: CharacterAbility[], abilityToSearch: AbilityName) =>
    abilities.find((ability) => ability.abilityName === abilityToSearch)?.abilityScore ?? 0;
  const columns: Column<Character>[] = useMemo(
    () => [
      {
        accessor: 'name',
        Cell: ({ value, row }: CellProps<Character>) => (
          <div className={styles.character}>
            <input
              type="checkbox"
              checked={teamProfiles.some((profile) => profile.id === row.original.id)}
              onChange={(e) => {
                // quick way to toggle without handling internal state
                row.toggleRowSelected();
                onClick(row.original, e.target.checked);
              }}
            />
            <Profile size={40} name={row.original.name} src={row.original.thumbnail ?? row.original.image} />
            <b>{value}</b>
          </div>
        ),
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
    [onClick, teamProfiles]
  );

  return (
    <Table
      columns={columns}
      data={characterData}
      initialState={{
        selectedRowIds: teamProfiles.map((r) => characterData.indexOf(r)).reduce((ac, a) => ({ ...ac, [a]: true }), {}),
      }}
    />
  );
};

export default CharacterTable;
