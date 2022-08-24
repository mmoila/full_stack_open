import express from "express";
const app = express();
import { calculateBmi } from "./bmiCalculator";
import { parseList, produceExerciseSummary } from "./exerciseCalculator";

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("hello full stack");
});


app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  try {
    res.json({
      height: height,
      weight: weight,
      bmi: calculateBmi(height, weight),
    });
  } catch (error) {
    if (error instanceof Error) {
      res.json({ error: error.message });
    }
  }}
);

app.get("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  let data: Array<number|string> = req.body.daily_exercises; //eslint-disable-line @typescript-eslint/no-unsafe-member-access
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  data = [req.body.target, ...data]; //eslint-disable-line @typescript-eslint/no-unsafe-member-access

  try {
    const hours = parseList(data);
    res.json(produceExerciseSummary(hours));

  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({error: error.message});
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
