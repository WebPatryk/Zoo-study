import styles from './CustomProgressBar.module.scss';
import { NextPage } from 'next';
import { FaRegClock } from 'react-icons/fa';
import classNames from 'classnames';

interface Progress {
  title: string;
  in_progress: string;
}
interface PropsData {
  progress: Progress;
}

const CustomProgressBar = (props: PropsData) => {
  const { in_progress } = props.progress;

  console.log(props);

  const time = '22min';

  return (
    <div className={styles.progressBar}>
      <div className={styles.eee}>
        <p className={styles.yourProgress}>Your progress</p>
        <div className={styles.progressInfo}>
          <FaRegClock />
          <p>Updated: {time}</p>
        </div>
      </div>
      <div className={styles.progressInfo}>
        <h3 className={styles.progress}>{in_progress} to complete</h3>
      </div>

      <div>
        <div className={classNames(styles.meter, styles.animate)}>
          <span style={{ width: in_progress }}>
            <span></span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomProgressBar;
