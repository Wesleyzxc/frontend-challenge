import styles from './Profile.module.css';

interface IProfileProps {
  size?: number;
}
const Profile = ({ size = 80 }: IProfileProps) => {
  const sizeInPx = size + 'px';
  return <div className={styles.profile} style={{ height: sizeInPx, width: sizeInPx }}></div>;
};

export default Profile;
