import styles from "./styles.module.css";

export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader} data-testid="loader" />
    </div>
  );
};
