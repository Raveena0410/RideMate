require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connect = require('./Config/Config');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ message: 'Backend is running' });
});

app.use('/api', require('./Router/Router'));

async function startServer() {
  try {
    await connect();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Backend startup failed:', error.message);
    process.exit(1);
  }
}

startServer();
