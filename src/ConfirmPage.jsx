import React, { useState } from 'react';

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
    <div className="confirm-page">
      <h2>Confirm Selection</h2>
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
      <button onClick={handleYes} disabled={!name.trim()}>Yes</button>
      <button onClick={onCancel}>No</button>
    </div>
  );
}

export { generateConfirmationNumber };
export default ConfirmPage;
