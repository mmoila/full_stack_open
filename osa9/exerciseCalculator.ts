/*
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }
*/

interface ExerciseSummary {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const parseList = (args: Array<string|number>): Array<number> => {
  if (args.length < 2) throw new Error("Not enough arguments");

  const formattedData = args
    .filter((n) => !isNaN(Number(n)))
    .map((n) => Number(n));

  if (args.length !== formattedData.length) {
    throw new Error("Provided values were not numbers!");
  }

  return formattedData;
};

export const produceExerciseSummary = (
  exerciseHours: Array<number>
): ExerciseSummary => {
  const dailyTarget = exerciseHours[0];
  const hours = exerciseHours.slice(1);
  const totalHours = hours.reduce((prev, next) => prev + next);

  if (hours.length === 0) {
    throw new Error("You need to submit at least one exercise!");
  }
  const dailyAverage = totalHours / hours.length;

  const getRating = () => {
    if (totalHours < 5) {
      return { rating: 1, description: "poor" };
    } else if (totalHours < 9) {
      return { rating: 2, description: "average" };
    } else {
      return { rating: 3, description: "good" };
    }
  };

  const ratingObject = getRating();

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((n) => n !== 0).length,
    success: dailyAverage >= dailyTarget ? true : false,
    rating: ratingObject.rating,
    ratingDescription: ratingObject.description,
    target: dailyTarget,
    average: dailyAverage,
  };
};


/*
try {
  const exerciseList = parseList(process.argv);
  console.log(produceExerciseSummary(exerciseList));
} catch (error: unknown) {
  let errorMessage = "Something went wrong. ";
  if (error instanceof Error) {
    errorMessage += (`Error: ${error.message}`);
  }
  console.log(errorMessage);
}
*/