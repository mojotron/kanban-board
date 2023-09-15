import styles from './PriorityLegend.module.css';

const priorityConfig = [
  { text: 'low', backgroundColor: 'green' },
  { text: 'high', backgroundColor: 'yellow' },
  { text: 'very high', backgroundColor: 'red' },
];

const PriorityLegend = () => {
  return (
    <div className={styles.priority}>
      <h4 className={styles.priorityHeading}>Priorities</h4>
      <div className={styles.priorityWrapper}>
        {priorityConfig.map((p) => (
          <div key={p.text}>
            <span
              className={`${styles.priorityMark} ${
                styles[`priorityMark--${p.backgroundColor}`]
              }`}
            >
              {p.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriorityLegend;
