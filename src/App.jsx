import { useState, useEffect } from 'react'
import './App.css'
import './style/timestamps.css'
import { CoffeeTypePage, CoffeeOptionPage, MilkSyrupOptionPage, TimestampPage } from './CoffeeTypePage'
import ConfirmPage, { generateConfirmationNumber } from './ConfirmPage'
import FinalPage from './FinalPage'

function App() {
  // Login state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Helper to format time
  const formatTime = (hour, minute) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    // Use correct non-breaking space (\u00A0) between time and AM/PM
    return `${displayHour}:${minute.toString().padStart(2, '0')}` + '\u00A0' + ampm;
  };

  // New state for coffee type, option, milk, syrup, and page
  const [coffeeType, setCoffeeType] = useState(null);
  const [coffeeOption, setCoffeeOption] = useState(null);
  const [milkType, setMilkType] = useState(null);
  const [syrupType, setSyrupType] = useState(null);
  const [selectedTimestamp, setSelectedTimestamp] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [milkSyrupComplete, setMilkSyrupComplete] = useState(false);
  const [page, setPage] = useState(0); // 0: type, 1: option, 2: milk/syrup, 3: timestamp, 4: confirm, 5: final
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [userNotes, setUserNotes] = useState('');
  const [finalOrder, setFinalOrder] = useState({});
  // Remove showWelcome state and always show both welcome and coffee type selection together

  // Generate a 4x3 grid of 5-minute slots starting from 8:00 am, but only include times before or at 9:00 am
  const startHour = 8;
  const startMinute = 0;
  const slotInterval = 5; // 5 minutes
  const timestamps = [];
  let hour = startHour;
  let minute = startMinute;
  while (hour < 9 || (hour === 9 && minute === 0)) {
    timestamps.push(formatTime(hour, minute));
    minute += slotInterval;
    if (minute >= 60) {
      minute = 0;
      hour++;
    }
  }
  // Build 3x4 grid (3 rows, 4 columns)
  const timestampGrid = [];
  for (let i = 0; i < 3; i++) {
    timestampGrid.push(timestamps.slice(i * 4, (i + 1) * 4));
  }

  // Track taken time slots (no persistence)
  const [takenSlots, setTakenSlots] = useState([]);

  // Fetch taken slots from Google Apps Script API
  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbylpYNyj8v1qJyn8yUnvqZYfTpXeq_7xb_cLfzq-rv7CAh8Eauicn2j46GqXCc4Hqjt/exec')
      .then(res => res.json())
      .then(data => {
        setTakenSlots(Object.keys(data));
      });
  }, []);

  // Handlers for navigation and selection
  const handleCoffeeTypeSelect = (type) => {
    setCoffeeType(type);
  };
  const handleTypeContinue = () => {
    if (coffeeType) setPage(1);
  };
  const handleCoffeeOptionSelect = (option) => {
    setCoffeeOption(option);
    if (option !== 'Latte') {
      setMilkType(null);
      setSyrupType(null);
    }
  };
  const handleOptionContinue = () => {
    if (coffeeOption === 'Latte') {
      setPage(2);
    } else if (coffeeOption) {
      setPage(3);
    }
  };
  const handleOptionBack = () => {
    setPage(0);
    setCoffeeOption(null);
  };
  const handleMilkSelect = (milk) => {
    setMilkType(milk);
  };
  const handleSyrupSelect = (syrup) => {
    setSyrupType(syrup);
  };
  const handleContinueMilkSyrup = () => {
    if (milkType && syrupType) {
      setMilkSyrupComplete(true);
      setPage(3);
    }
  };
  const handleBackToOption = () => {
    setPage(1);
    setMilkType(null);
    setSyrupType(null);
    setMilkSyrupComplete(false);
  };
  const handleTimestampClick = (timestamp) => {
    if (takenSlots.includes(timestamp)) return; // Prevent selecting taken slot
    setSelectedTimestamp(timestamp);
    setShowConfirm(true);
    setPage(4);
  };
  const handleTimestampBack = () => {
    if (coffeeOption === 'Latte') {
      setPage(2);
    } else {
      setPage(1);
    }
    setSelectedTimestamp(null);
    setShowConfirm(false);
  };
  const handleConfirm = ({ name, notes }) => {
    const confirmationNum = generateConfirmationNumber();
    setShowConfirm(false);
    setPage(5);
    setConfirmationNumber(confirmationNum);
    setUserName(name);
    setUserNotes(notes);
    setFinalOrder({
      confirmationNumber: confirmationNum,
      userName: name,
      userNotes: notes,
      coffeeType,
      coffeeOption,
      milkType,
      syrupType,
      timestamp: selectedTimestamp
    });
    if (selectedTimestamp) {
      setTakenSlots(prev => [...prev, selectedTimestamp]);
    }
  };
  const handleCancel = () => {
    setShowConfirm(false);
    setSelectedTimestamp(null);
    setPage(3);
  };
  const handleNewOrder = () => {
    setCoffeeType(null);
    setCoffeeOption(null);
    setMilkType(null);
    setSyrupType(null);
    setSelectedTimestamp(null);
    setShowConfirm(false);
    setMilkSyrupComplete(false);
    setPage(0);
    setConfirmationNumber('');
    setUserName('');
    setUserNotes('');
    setFinalOrder({});
  };

  // Simple login handler (hardcoded credentials for demo)
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUsername === 'employee' && loginPassword === 'WILACBTIIR') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  // Render logic
  let pageContent;
  if (page === 0) {
    pageContent = (
      <div className="welcome-coffee-type">
        <h1 style={{ fontSize: '2.5em', marginBottom: '0.5em' }}>Welcome!</h1>
        <h2>Ready to order?</h2>
        <CoffeeTypePage onSelect={handleCoffeeTypeSelect} onContinue={handleTypeContinue} canContinue={!!coffeeType} selectedType={coffeeType} />
      </div>
    );
  } else if (page === 1) {
    pageContent = <CoffeeOptionPage type={coffeeType} onSelect={handleCoffeeOptionSelect} onBack={handleOptionBack} onContinue={handleOptionContinue} canContinue={!!coffeeOption} selectedOption={coffeeOption} />;
  } else if (page === 2) {
    pageContent = <MilkSyrupOptionPage
      onMilkSelect={handleMilkSelect}
      onSyrupSelect={handleSyrupSelect}
      milkType={milkType}
      syrupType={syrupType}
      onContinue={handleContinueMilkSyrup}
      onBack={handleBackToOption}
    />;
  } else if (page === 3) {
    pageContent = <TimestampPage timestampGrid={timestampGrid} onTimestampClick={handleTimestampClick} onBack={handleTimestampBack} selectedTimestamp={selectedTimestamp} takenSlots={takenSlots} />;
  } else if (page === 4 && showConfirm) {
    pageContent = (
      <ConfirmPage
        timestamp={selectedTimestamp}
        coffeeType={coffeeType}
        coffeeOption={coffeeOption}
        milkType={milkType}
        syrupType={syrupType}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    );
  } else if (page === 5) {
    pageContent = <FinalPage
      confirmationNumber={confirmationNumber}
      userName={userName}
      userNotes={userNotes}
      coffeeType={finalOrder.coffeeType}
      coffeeOption={finalOrder.coffeeOption}
      milkType={finalOrder.milkType}
      syrupType={finalOrder.syrupType}
      timestamp={finalOrder.timestamp}
      onNewOrder={handleNewOrder}
    />;
  }

  if (!isAuthenticated) {
    return (
      <div className="login-page" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh'}}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '1em', minWidth: '250px'}}>
          <input
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={e => setLoginUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={loginPassword}
            onChange={e => setLoginPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {loginError && <div style={{color: 'red', marginTop: '0.5em'}}>{loginError}</div>}
        </form>
      </div>
    );
  }

  return (
    <>
      <h1>Alvin's Expresso</h1>
      {pageContent}
    </>
  )
}

export default App
