import styles from './Metric.module.css';

const Metric = () => {
  return (
    <div className={styles.metric}>
      <label className={styles.label}>Test</label>
      <b className={styles.value}>6.00</b>
    </div>
  );
};

export default Metric;
