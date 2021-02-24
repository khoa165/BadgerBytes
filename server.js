'use strict';

const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const app = express();

// Connect database.
connectDB();

// Init middleware.
app.use(express.json({ extended: false }));

// Define routes.
const API = 'api/v1';
app.use(`/${API}/auth`, require(`./${API}/routes/auth`));
app.use(`/${API}/users`, require(`./${API}/routes/users`));
app.use(`/${API}/items`, require(`./${API}/routes/items`));
app.use(`/${API}/orders`, require(`./${API}/routes/orders`));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (_req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

// Listening to app.
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Export app for testing purposes.
module.exports = app;
