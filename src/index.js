const express = require('express');
const cors = require('cors');
const referralRoutes = require('./routes/referralRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Allow frontend to connect
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Accredian Referral Backend');
});

app.use('/referrals', referralRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});