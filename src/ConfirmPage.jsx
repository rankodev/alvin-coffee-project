import React, { useState } from 'react';
import styles from './CoffeeTypePage.module.scss';

function generateConfirmationNumber(length = 5) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function ConfirmPage({ timestamp, coffeeType, coffeeOption, milkType, syrupType, onConfirm, onCancel }) {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const handleYes = () => {
    onConfirm({ name, notes });
  };

  return (
    <div className={styles.coffeeTypePage}>
      <div className={styles.orderCard}>
        <div className={styles.orderCardHeader}>
          <div className={styles.orderCardTitle}>Confirm Selection</div>
        </div>
        <div className={styles.orderCardBody}>
          <p>
            Do you want to choose <strong>{timestamp}</strong>?
            <br />
            Coffee: <strong>{coffeeType}</strong>
            {coffeeOption && <><br />Option: <strong>{coffeeOption}</strong></>}
            {milkType && <><br />Milk: <strong>{milkType}</strong></>}
            {syrupType && <><br />Syrup: <strong>{syrupType}</strong></>}
          </p>
          <div style={{margin: '1em 0'}}>
            <label>
              Name:<br />
              <input type="text" value={name} onChange={e => setName(e.target.value)} style={{width: '100%'}} />
            </label>
          </div>
          <div style={{margin: '1em 0'}}>
            <label>
              Extra Notes:<br />
              <textarea value={notes} onChange={e => setNotes(e.target.value)} style={{width: '100%'}} />
            </label>
          </div>
            <div>
              <button className={styles.orderCardContinueBtn} onClick={handleYes} disabled={!name.trim()}>Yes</button>
              <button className={styles.orderCardContinueBtn} onClick={onCancel} style={{marginLeft: '1em', background: '#eee', color: '#3b2c1a'}}>No</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export { generateConfirmationNumber };
export default ConfirmPage;
