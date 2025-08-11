const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = './slots.json';

// Initialize slots if file doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  const slots = [
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

// Get all slots
app.get('/slots', (req, res) => {
  const slots = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(slots);
});

// Claim a slot
app.post('/slots/claim', (req, res) => {
  const { timestamp } = req.body;
  let slots = JSON.parse(fs.readFileSync(DATA_FILE));
  const slot = slots.find(s => s.timestamp === timestamp);
  if (!slot) return res.status(404).json({ success: false, error: 'Slot not found' });
  if (slot.taken) return res.status(409).json({ success: false, error: 'Slot already taken' });
  slot.taken = true;
  fs.writeFileSync(DATA_FILE, JSON.stringify(slots, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Slot backend running on http://localhost:${PORT}`);
});
