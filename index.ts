import express from 'express';
import { calBMI } from './bmiCal';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (_req, res) => {
  const weight = Number(_req.query.weight);
  const height = Number(_req.query.height);
  res.json({bmi: calBMI(weight, height)});
})
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('To test the server, visit http://localhost:3000/ping');
})