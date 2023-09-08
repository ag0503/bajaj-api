const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define your user ID and other information
const userId = 'john_doe_17091999';
const email = 'john@xyz.com';
const rollNumber = 'ABCD123';

app.post('/bfhl', (req, res) => {
  const { data } = req.body;

  // Function to find the highest alphabet
  const findHighestAlphabet = (arr) => {
    return arr
      .filter((char) => /^[A-Za-z]$/.test(char))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
      .pop();
  };

  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const highestAlphabet = findHighestAlphabet(alphabets);

  const response = {
    is_success: true,
    user_id: userId,
    email: email,
    roll_number: rollNumber,
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: highestAlphabet ? [highestAlphabet] : [],
  };

  res.json(response);
});

app.get('/bfhl', (req, res) => {
  // This endpoint doesn't require any user input
  res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
