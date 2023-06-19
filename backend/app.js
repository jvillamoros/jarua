const express = require('express');
const app = express();

// Middlewares
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const slackRoutes = require('./routes/slackRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const knowledgeRoutes = require('./routes/knowledgeRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/slack', slackRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/knowledge', knowledgeRoutes);

module.exports = app;
