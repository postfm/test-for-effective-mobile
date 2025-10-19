import express from 'express';
import userRouter from './features/user/routes/user.router';
import authRouter from './features/auth/routers/auth.router';
import passport from './features/auth/config/passport';

const PORT = process.env.PORT || 4000;

const app = express();

// Enable JSON body parsing
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => console.log(`Server start on port: ${PORT}`));
