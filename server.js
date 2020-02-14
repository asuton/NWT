const express = require('express');
const connectDB = require('./config/db');

// inicijalizacija aplikacije
const app = express();

// Connnect Database 
connectDB();

// Init Middleware
// Koristi se express za parsiranje tijela requesta
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API Running'));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/events', require('./routes/api/events'));

// process.env.PORT ako se nalazi na serveru, default 5000
const PORT = process.env.PORT || 5000;

// callback kad se pokrene na portu
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));