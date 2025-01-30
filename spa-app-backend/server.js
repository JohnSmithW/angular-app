const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = 'your_jwt_secret';

let schedule = {
  monday: { start: '00:00', end: '24:00' },
  tuesday: { start: '00:00', end: '24:00' },
  wednesday: { start: '00:00', end: '24:00' },
  thursday: { start: '00:00', end: '24:00' },
  friday: { start: '00:00', end: '24:00' },
  saturday: { start: '00:00', end: '24:00' },
  sunday: { start: '00:00', end: '24:00' },
};

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if ((email === 'user1@some.com' || email === 'user2@some.com') && email === password) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/schedule', authenticateJWT, (req, res) => {
  res.json(schedule);
});

app.put('/api/schedule', authenticateJWT, (req, res) => {
  schedule = req.body;
  res.json({ message: 'Schedule updated' });
});

app.get('/api/check', (req, res) => {
  const getCurrentDay = () => ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][new Date().getDay()];
  const timeToMinutes = (time) => time.split(':').reduce((h, m) => h * 60 + +m, 0);
  
  const day = schedule[getCurrentDay()];
  const current = new Date().getHours() * 60 + new Date().getMinutes();
  const allowed = current >= timeToMinutes(day.start) && current <= timeToMinutes(day.end);
  
  res.json({ allowed });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));