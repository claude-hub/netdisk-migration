const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('dist'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on ${port} port.`);
});
