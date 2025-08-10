import React, { useRef } from 'react';
import { generateConfirmationNumber } from './ConfirmPage';

function FinalPage({ confirmationNumber, userName, userNotes, coffeeType, coffeeOption, milkType, syrupType, timestamp, onNewOrder }) {
  // Format coffee details in a natural language style
  let coffeeDetails = '';
  if (coffeeType) {
    coffeeDetails = coffeeType;
    if (coffeeOption) coffeeDetails += ` ${coffeeOption}`;
    if (milkType) coffeeDetails += ` with ${milkType} Milk`;
    if (syrupType) coffeeDetails += ` and ${syrupType} Syrup`;
  }

  // If confirmationNumber is not passed, generate a new one (should be passed from parent ideally)
  const number = confirmationNumber || generateConfirmationNumber();

  // Prevent duplicate POSTs by using a ref
  const postedRef = useRef(false);

  React.useEffect(() => {
    if (postedRef.current) return;
    postedRef.current = true;
    // Google Form POST URL and entry IDs (replace with your actual entry IDs)
    const formId = '1FAIpQLSc0bzy9cvMkrpPdcccMLOk5EURe5enSuIsWc1V8fTcNjmq4Jw';
    const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
    // You must get the entry IDs for each field from your Google Form
    const formData = new FormData();
    formData.append('entry.329297917', userName || ''); // Name
    formData.append('entry.2047595073', userNotes || ''); // Extra Notes
    formData.append('entry.1872596417', coffeeDetails); // Concatenated Coffee Details
    formData.append('entry.951955356', timestamp || ''); // Timestamp
    formData.append('entry.617066582', number || ''); // Confirmation Number
    formData.append('entry.736412385', slotFilled || '')
    // Send POST request
    fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    });
  }, [number, userName, userNotes, coffeeDetails, timestamp]);

  return (
    <div className="final-page">
      <h2>Order Confirmed!</h2>
      <p>Your order has been placed successfully.</p>
      <div style={{margin: '1em 0', fontWeight: 'bold', fontSize: '1.5em'}}>
        Confirmation Number: {number}
      </div>
      {userName && (
        <div style={{margin: '1em 0'}}>
          <strong>Name:</strong> {userName}
        </div>
      )}
      {userNotes && (
        <div style={{margin: '1em 0'}}>
          <strong>Extra Notes:</strong> {userNotes}
        </div>
      )}
      <div style={{margin: '1em 0'}}>
        <strong>Coffee Details:</strong> {coffeeDetails}
      </div>
      {timestamp && (
        <div style={{margin: '1em 0'}}>
          <strong>Timestamp:</strong> {timestamp}
        </div>
      )}
      <p>Thank you for your order!</p>
      <button onClick={onNewOrder} style={{marginTop: '2em', fontSize: '1.1em'}}>New Order</button>
    </div>
  );
}

export default FinalPage;
