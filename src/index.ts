import express from 'express';

const PORT = process.env.PORT || 4000;

const app = express();

app.get('/', (req, res) => {
  res.send('HELLO!');
});

app.listen(PORT, () => console.log(`Server start on port: ${PORT}`));
