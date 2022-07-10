import Image from 'next/image';
import react from 'react';
import { Spinner } from 'reactstrap';
import styles from './gdce_loading_screen.module.scss';

const GDCELoadingScreen = () => {
  return (
    <div className={styles.gdce_loading_container}>
      <Image src="/logo/moclogo.webp" width={376} height={120} alt="menu-icon" layout={'fixed'} />

      <Spinner className={styles.gdce_loading_spinner} />
    </div>
  );
};

export default GDCELoadingScreen;
