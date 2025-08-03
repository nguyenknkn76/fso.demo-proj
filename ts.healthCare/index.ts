import express from 'express';
import { calBMI } from './bmiCal';
import { calExercise } from './exeCal';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req , res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
      res.status(400).json({ error: 'malformatted parameters' });
    }
    res.json({bmi: calBMI(weight, height)});
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  const validatedDailyExercises = 
    Array.isArray(daily_exercises) &&
    daily_exercises.every(exercise => typeof exercise === 'number' &&
    exercise >= 0);

  const validatedTarget = 
    typeof target === 'number' &&
    target >= 0;

  if (!validatedDailyExercises || !validatedTarget) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
  const result = calExercise(daily_exercises, target);
  res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('To test the server, visit http://localhost:3000/ping');
  console.log('To calculate BMI, visit http://localhost:3000/bmi?weight=80&height=1.8');
});