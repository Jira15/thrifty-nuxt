const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Enable body parsing for x-www-form-urlencoded content type
app.use(express.urlencoded({ extended: true }));

app.post('/api/tarjeta', (req, res) => {
  const url = 'https://secure.nmi.com/api/transact.php';
  const data = req.body;
  console.log('data', data);

  axios.post(url, new URLSearchParams(data).toString(), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => {
      console.log('Post request successful:', response.data);
      res.json(response.data);
    })
    .catch(error => {
      console.error('Post request failed:', error);
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});