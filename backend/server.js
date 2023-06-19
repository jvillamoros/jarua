const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/jarua-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
