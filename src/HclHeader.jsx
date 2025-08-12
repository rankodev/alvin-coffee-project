
import React from 'react';
import hclLogo from './assets/HCI Horz. Logo.png';
import styles from './HclHeader.module.scss';

const HclHeader = () => (
  <header className={styles.headerRoot}>
    <div className={styles.logoSection}>
      <img src={hclLogo} alt="HCI Logo" className={styles.logoImg} />

    </div>
    <nav className={styles.nav} aria-label="Main navigation">
        <span className={styles.brandText}>HCI Coffee Hour</span>
    </nav>
    <div>
      
    </div>
  </header>
);

export default HclHeader;
