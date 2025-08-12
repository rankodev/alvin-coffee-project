export { CoffeeTypePage, CoffeeOptionPage, MilkSyrupOptionPage, TimestampPage };
import React from 'react';
import styles from './CoffeeTypePage.module.scss';
//

function CoffeeTypePage({ onSelect, onContinue, canContinue, selectedType }) {
  // ...existing code...
  // Correct order card rendering only at the top level
  return (
    <div className={styles.coffeeTypePage}>
      <div className={styles.orderCard}>
        <div className={styles.orderCardHeader}>
          <div className={styles.orderCardTitle}>Welcome!</div>
          <div className={styles.orderCardSubtitle}>Ready to order?</div>
        </div>
        <div className={styles.orderCardBody}>
          <div className={styles.orderCardQuestion}>What kind of coffee would you like?</div>
          <div className={styles.orderCardBtnRow}>
            <button
              className={styles.orderCardCoffeeBtn + (selectedType === 'Hot' ? ' ' + styles.selected : '')}
              onClick={() => onSelect('Hot')}
              type="button"
            >
              Hot Coffee
            </button>
            <button
              className={styles.orderCardCoffeeBtn + (selectedType === 'Ice' ? ' ' + styles.selected : '')}
              onClick={() => onSelect('Ice')}
              type="button"
            >
              Ice Coffee
            </button>
          </div>
          <button
            className={styles.orderCardContinueBtn}
            onClick={onContinue}
            disabled={!canContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
// ...existing code...

function CoffeeOptionPage({ type, onSelect, onBack, onContinue, canContinue, selectedOption }) {
  const options = type === 'Hot' ? ['Espresso', 'Cubano', 'Latte'] : ['Latte'];
  return (
    <div className={styles.coffeeTypePage}>
      <div className={styles.orderCard}>
        <div className={styles.orderCardHeader}>
          <div className={styles.orderCardTitle}>Choose {type} Coffee Option</div>
        </div>
        <div className={styles.orderCardBody}>
          <div className={styles.orderCardBtnRow}>
            {options.map(opt => (
              <button
                key={opt}
                className={styles.orderCardCoffeeBtn + (selectedOption === opt ? ' ' + styles.selected : '')}
                onClick={() => onSelect(opt)}
                type="button"
              >
                {opt}
              </button>
            ))}
          </div>
          <div>
            <button className={styles.orderCardContinueBtn} onClick={onBack} style={{marginRight: '1em', background: '#eee', color: '#3b2c1a'}}>
              Back
            </button>
            <button className={styles.orderCardContinueBtn} onClick={onContinue} disabled={!canContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MilkSyrupOptionPage({ onMilkSelect, onSyrupSelect, milkType, syrupType, onContinue, onBack }) {
  const milkOptions = ['Whole', 'Oat'];
  const syrupOptions = ['N/A', 'Lavender', 'Mocha', 'Caramel', 'Vanilla'];
  return (
    <div className={styles.coffeeTypePage}>
      <div className={styles.orderCard + ' ' + styles.wide}>
        <div className={styles.orderCardHeader}>
          <div className={styles.orderCardTitle}>Choose Milk and Syrup</div>
        </div>
        <div className={styles.orderCardBody}>
          <div style={{marginBottom: '1em'}}>
            <div>Milk:</div>
            {milkOptions.map(opt => (
              <button
                key={opt}
                onClick={() => onMilkSelect(opt)}
                className={styles.orderCardCoffeeBtn + (milkType === opt ? ' ' + styles.selected : '')}
                style={{marginRight: '0.5em'}}
              >
                {opt}
              </button>
            ))}
          </div>
          <div style={{marginBottom: '1em'}}>
            <div>Syrup:</div>
            {syrupOptions.map(opt => (
              <button
                key={opt}
                onClick={() => onSyrupSelect(opt)}
                className={styles.orderCardCoffeeBtn + (syrupType === opt ? ' ' + styles.selected : '')}
                style={{marginRight: '0.5em'}}
              >
                {opt}
              </button>
            ))}
          </div>
          <div>
            <button className={styles.orderCardContinueBtn} onClick={onBack} style={{marginRight: '1em', background: '#eee', color: '#3b2c1a'}}>Back</button>
            <button className={styles.orderCardContinueBtn} onClick={onContinue} disabled={!milkType || !syrupType}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimestampPage({ timestampGrid, onTimestampClick, onBack, selectedTimestamp, takenSlots = [], onContinue }) {
  return (
    <div className={styles.coffeeTypePage}>
      <div className={styles.orderCard}>
        <div className={styles.orderCardHeader}>
          <div className={styles.orderCardTitle}>Choose a Time Slot</div>
        </div>
        <div className={styles.orderCardBody}>
          <table className="timestamp-grid" style={{margin: '0 auto', borderCollapse: 'collapse'}}>
            <tbody>
              {timestampGrid.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {row.map((timestamp, colIdx) => {
                    // Normalize spaces for comparison
                    const normalize = str => str.replace(/[\u0020\u00A0](AM|PM)/, ' $1');
                    const isTaken = takenSlots.some(t => normalize(t) === normalize(timestamp));
                    return (
                      <td key={colIdx} style={{padding: '0.2em'}}>
                        <button
                          onClick={() => onTimestampClick(timestamp)}
                          className={
                            (selectedTimestamp === timestamp ? 'selected ' : '') + (isTaken ? 'taken-slot' : '')
                          }
                          style={{width: '6em'}}
                          disabled={isTaken}
                        >
                          {timestamp}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button className={styles.orderCardContinueBtn} onClick={onBack} style={{marginRight: '1em', background: '#eee', color: '#3b2c1a'}}>Back</button>
            <button className={styles.orderCardContinueBtn} onClick={onContinue} disabled={!selectedTimestamp} style={{marginTop: '2em'}}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
