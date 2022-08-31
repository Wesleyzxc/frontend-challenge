import { useState } from 'react';
import Profile, { IProfileProps } from './Profile';
import styles from './Profile.module.css';

interface ISquadProfileProps extends Omit<IProfileProps, 'size'> {
  onClick: () => void;
}

const SquadProfile = ({ onClick, ...props }: ISquadProfileProps) => {
  const [showText, setShowText] = useState(false);
  return (
    <div className={styles.container} onMouseOver={() => setShowText(true)} onMouseLeave={() => setShowText(false)}>
      <button className={styles.remove} onClick={onClick}>
        {showText && 'Remove'}
      </button>
      <Profile {...props} size={80} />
    </div>
  );
};

export default SquadProfile;
