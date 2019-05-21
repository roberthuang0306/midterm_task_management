const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const items = require('./routes/api/items');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
mongoose
  .connect(db)
  .then(() => console.log('MondoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/items', items);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));