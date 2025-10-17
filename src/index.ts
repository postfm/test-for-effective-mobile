import express from 'express';
import router from './routes/user-router';

const PORT = process.env.PORT || 4000;

const app = express();

// Enable JSON body parsing
app.use(express.json());

app.use('/api/users', router);

app.listen(PORT, () => console.log(`Server start on port: ${PORT}`));
