import { CharacterAbility } from '../../types';
import styles from './Metric.module.css';

interface IMetricProp extends CharacterAbility {}

const Metric = ({ abilityName, abilityScore }: IMetricProp) => (
  <div className={styles.metric}>
    <label className={styles.label}>{abilityName}</label>
    <b className={styles.value}>{abilityScore === 0 ? '-' : Math.round(abilityScore * 100) / 100}</b>
  </div>
);

export default Metric;
