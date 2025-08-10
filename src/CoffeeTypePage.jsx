import React from 'react';

function CoffeeTypePage({ onSelect, onContinue, canContinue, selectedType }) {
  return (
    <div className="coffee-type-page">
      <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em' }}>What kind of coffee would you like?</h1>
      <button onClick={() => onSelect('Hot')} className={selectedType === 'Hot' ? 'selected' : ''}>Hot Coffee</button>
      <button onClick={() => onSelect('Ice')} className={selectedType === 'Ice' ? 'selected' : ''}>Ice Coffee</button>
      <div style={{marginTop: '1em'}}>
        <button className="continue-btn" onClick={onContinue} disabled={!canContinue}>Continue</button>
      </div>
    </div>
  );
}

function CoffeeOptionPage({ type, onSelect, onBack, onContinue, canContinue, selectedOption }) {
  const options = type === 'Hot' ? ['Espresso', 'Cubano', 'Latte'] : ['Latte'];
  return (
    <div className="coffee-option-page">
      <h2>Choose {type} Coffee Option</h2>
      {options.map(opt => (
        <button key={opt} onClick={() => onSelect(opt)} className={selectedOption === opt ? 'selected' : ''}>{opt}</button>
      ))}
      <div style={{marginTop: '1em'}}>
        <button onClick={onBack} style={{marginRight: '1em'}}>Back</button>
        <button className="continue-btn" onClick={onContinue} disabled={!canContinue}>Continue</button>
      </div>
    </div>
  );
}

function MilkSyrupOptionPage({ onMilkSelect, onSyrupSelect, milkType, syrupType, onContinue, onBack }) {
  const milkOptions = ['Whole', 'Oat'];
  const syrupOptions = ['N/A', 'Lavendar', 'Mocha', 'Caramel', 'Vanilla'];
  return (
    <div className="milk-syrup-option-page">
      <h2>Choose Milk and Syrup</h2>
      <div style={{marginBottom: '1em'}}>
        <div>Milk:</div>
        {milkOptions.map(opt => (
          <button
            key={opt}
            onClick={() => onMilkSelect(opt)}
            className={milkType === opt ? 'selected' : ''}
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
            className={syrupType === opt ? 'selected' : ''}
            style={{marginRight: '0.5em'}}
          >
            {opt}
          </button>
        ))}
      </div>
      <button className="continue-btn" onClick={onContinue} disabled={!milkType || !syrupType} style={{marginRight: '1em'}}>Continue</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

function TimestampPage({ timestampGrid, onTimestampClick, onBack, selectedTimestamp, takenSlots = [] }) {
  return (
    <div>
      <button onClick={onBack} style={{marginBottom: '1em'}}>Back</button>
      <table className="timestamp-table" style={{margin: '0 auto', borderCollapse: 'collapse'}}>
        <tbody>
          {timestampGrid.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((timestamp, colIdx) => {
                const isTaken = takenSlots.includes(timestamp);
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
    </div>
  );
}

export { CoffeeTypePage, CoffeeOptionPage, MilkSyrupOptionPage, TimestampPage };
