const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(bodyParser.json());

// Секретный ключ для JWT
const secretKey = 'your_secret_key';

// Пользователи
const users = [
  { email: 'user1@some.com', password: 'user1@some.com' },
  { email: 'user2@some.com', password: 'user2@some.com' }
];

// Расписание доступа
let schedule = [
  { name: 'Понедельник', startTime: '00:00', endTime: '24:00' },
  { name: 'Вторник', startTime: '00:00', endTime: '24:00' },
  { name: 'Среда', startTime: '00:00', endTime: '24:00' },
  { name: 'Четверг', startTime: '00:00', endTime: '24:00' },
  { name: 'Пятница', startTime: '00:00', endTime: '24:00' },
  { name: 'Суббота', startTime: '00:00', endTime: '24:00' },
  { name: 'Воскресенье', startTime: '00:00', endTime: '24:00' }
];

// Мидлвар для проверки JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    console.error('No token provided'); 
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error('JWT verification error:', err);  ошибки
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// Маршрут для авторизации
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user == null) {
    console.error('User not found or incorrect password'); 
    return res.sendStatus(401);
  }

  const accessToken = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
  res.json({ accessToken });
});

// Маршрут для получения расписания
app.get('/schedule', authenticateToken, (req, res) => {
  console.log('GET /schedule request received'); 
  res.json(schedule);
});

// Маршрут для сохранения расписания
app.post('/schedule', authenticateToken, (req, res) => {
  console.log('POST /schedule request received', req.body); 
  schedule = req.body;
  res.status(201).send();
});

// Маршрут для проверки доступа без авторизации
app.get('/check-time', (req, res) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const currentTime = now.toTimeString().split(' ')[0];
  const daySchedule = schedule[dayOfWeek === 0 ? 6 : dayOfWeek - 1];

  if (currentTime >= daySchedule.startTime && currentTime <= daySchedule.endTime) {
    res.status(200).send('Доступ разрешен');
  } else {
    res.status(403).send('Доступ запрещен');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});