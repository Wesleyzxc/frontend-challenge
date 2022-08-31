import styles from './Profile.module.css';

export interface IProfileProps {
  size: number;
  src: string;
  name: string;
}
const Profile = ({ size, src, name }: IProfileProps) => {
  const sizeInPx = size + 'px';
  return <img className={styles.profile} style={{ height: sizeInPx, width: sizeInPx }} src={src} alt={name}></img>;
};

export default Profile;
