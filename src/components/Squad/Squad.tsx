import { Fragment, useState } from 'react';
import { AbilityName, ABILITY_NAMES, Character } from '../../types';
import Metric from '../Metric/Metric';
import MetricLine from '../Metric/MetricLine';
import Profile from '../Profile/Profile';
import CharacterTable from '../Table/CharacterTable';
import styles from './Squad.module.css';

type AbilityScoreMap = {
  [key in AbilityName]: number;
};

const Squad = () => {
  const [teamProfiles, setTeamProfiles] = useState<Character[]>([]);
  const title = teamProfiles.length ? 'Your champions!' : 'Select your squad to defend earthrealm';
  console.log('🚀 - teamProfiles', teamProfiles);

  const sumOfAbility: AbilityScoreMap = teamProfiles.reduce(
    (acc, curr) => {
      curr.abilities.forEach((ability) => {
        acc[ability.abilityName] += ability.abilityScore;
      });
      return acc;
    },
    {
      Power: 0,
      Mobility: 0,
      Technique: 0,
      Survivability: 0,
      Energy: 0,
    }
  );

  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.profiles}>
        {teamProfiles.map((profile) => (
          <Profile key={profile.id} src={profile.thumbnail ?? profile.image} name={profile.name} />
        ))}
      </div>
      <div className={styles.metrics}>
        {ABILITY_NAMES.map((abilityName, i) => (
          <Fragment key={abilityName}>
            {i === 2 && <MetricLine />}
            <Metric
              abilityName={abilityName}
              abilityScore={teamProfiles.length ? sumOfAbility[abilityName] / teamProfiles.length : 0}
            />
            {i === 2 && <MetricLine />}
          </Fragment>
        ))}
      </div>
      <sub className={styles.sub}>* Totals as average for squad</sub>

      <CharacterTable setTeamProfiles={setTeamProfiles} />
    </>
  );
};

export default Squad;
