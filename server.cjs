
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

// Set CSP header for all responses
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://alvin-coffee-project-d30ebc7da225.herokuapp.com/ https://docs.google.com;");
  next();
});

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = './slots.json';

// Initialize slots if file doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  const slots = [
    { "id": 0, "timestamp": "8:00 AM", "taken": false },
    { "id": 1, "timestamp": "8:05 AM", "taken": false },
    { "id": 2, "timestamp": "8:10 AM", "taken": false },
    { "id": 3, "timestamp": "8:15 AM", "taken": false },
    { "id": 4, "timestamp": "8:20 AM", "taken": false },
    { "id": 5, "timestamp": "8:25 AM", "taken": false },
    { "id": 6, "timestamp": "8:30 AM", "taken": false },
    { "id": 7, "timestamp": "8:35 AM", "taken": false },
    { "id": 8, "timestamp": "8:40 AM", "taken": false },
    { "id": 9, "timestamp": "8:45 AM", "taken": false },
    { "id": 10, "timestamp": "8:50 AM", "taken": false },
    { "id": 11, "timestamp": "8:55 AM", "taken": false },
    { "id": 12, "timestamp": "9:00 AM", "taken": false }
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(slots, null, 2));
}

// API routes
app.get('/slots', (req, res) => {
  const slots = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(slots);
});

app.post('/slots/claim', (req, res) => {
  const { timestamp } = req.body;
  let slots = JSON.parse(fs.readFileSync(DATA_FILE));
  const normalize = str => str.replace(/[\u0020\u00A0](AM|PM)/, ' $1');
  const slot = slots.find(s => normalize(s.timestamp) === normalize(timestamp));
  if (!slot) {
    console.log(`[${new Date().toISOString()}] Slot not found:`, timestamp);
    return res.status(404).json({ success: false, error: 'Slot not found' });
  }
  if (slot.taken) {
    console.log(`[${new Date().toISOString()}] Slot already taken:`, timestamp);
    return res.status(409).json({ success: false, error: 'Slot already taken' });
  }
  slot.taken = true;
  fs.writeFileSync(DATA_FILE, JSON.stringify(slots, null, 2));
  console.log(`[${new Date().toISOString()}] Slot claimed and written:`, timestamp);
  res.json({ success: true });
});

// Serve static files from the React build
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for all other non-API routes (SPA fallback)
app.get(/^\/(?!api|slots).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Slot backend and frontend running on http://localhost:${PORT}`);
});
