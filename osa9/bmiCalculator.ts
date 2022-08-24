/*

interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
*/

export const calculateBmi = (height: number, weight: number) => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error("malformatted parameters");
  }

  if (weight === 0) {
    throw new Error("Weight cannot be zero!");
  }
  const bmi = Math.round((weight / (height / 100) ** 2) * 10) / 10;
  if (bmi < 18.5) {
    return "Underweight (Unhealthy weight)";
  } else if (bmi >= 18.5 && bmi <= 22.9) {
    return "Normal range (Healthy weight)";
  } else if (bmi > 22.9 && bmi <= 24.9) {
    return "Overweight I (At risk)";
  } else if (bmi > 24.9 && bmi <= 29.9) {
    return "Overweight II (Moderately obese)";
  } else {
    return "Overweight III (Severely obese)";
  }
};

/*
try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong";
  if (error instanceof Error) {
    errorMessage += (`Error: ${error.message}`);
  }
  console.log(errorMessage);
}
*/