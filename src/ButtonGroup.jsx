import React from 'react';
import './ButtonGroup.css';

const buttonLabels = ['Espresso', 'Latte', 'Cappuccino', 'Mocha', 'Americano', 'Macchiato', 'Affogato', 'Flat White'];

function ButtonGroup({ onButtonClick }) {
  return (
    <div className="button-group">
      {buttonLabels.map((label, idx) => (
        <button key={idx} onClick={() => onButtonClick(label)}>
          {label}
        </button>
      ))}
    </div>
  );
}

export default ButtonGroup;
