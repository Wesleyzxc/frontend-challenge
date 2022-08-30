import styles from './Header.module.css';
import Logo from '../../img/Mortal-Kombat-Logo.png';

const Header = () => {
  return (
    <div className={styles.header}>
      <img src={Logo} alt="Mortal Kombat" className={styles.logo}></img>
    </div>
  );
};

export default Header;
