interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
}
const hello = "hello world";
const calExercise = (exerciseTimes : Array<number>, t : number) : Result => {
  if (!Array.isArray(exerciseTimes) || exerciseTimes.length === 0) {
    throw new Error('Invalid input: exerciseTimes must be a non-empty array');
  }
  if (exerciseTimes.some(time => typeof time !== 'number' || time < 0)) {
    throw new Error('Invalid input: all elements in exerciseTimes must be non-negative numbers');
  }
  const periodLength = exerciseTimes.length;
  const trainingDays = exerciseTimes.filter(time => time > 0).length;
  const target = t || 2;
  const average = exerciseTimes.reduce((a, b) => a + b, 0)/periodLength;
  const success = average >= target;
  const rating = average < target ? 1: average < target * 1.5 ? 2 : 3;
  const ratingDescription = rating === 1 ? 'you can do better'
    : rating == 2 ? 'not too bad, but you can do better'
    : 'you are doing great';
  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription
  }
}

try {
  let exerciseTimes : number[] = [];
  let target : number = Number(process.argv[2]);
  for (let i = 3; i < process.argv.length; i++){
    const time = Number(process.argv[i]);
    if (isNaN(time)) throw new Error(`Invalid input: ${process.argv[i]}`);;
    exerciseTimes.push(time);
  }
  // return calExercise(exerciseTimes, target);
  console.log(calExercise(exerciseTimes,target));
} catch (error) {
  let errorMessage = "Something went wrong:";
  if (error instanceof Error) {
    errorMessage += `${error.message}`;
  }
  console.log(errorMessage);
}
// console.log(calExercise([3, 0, 2, 4.5, 0, 3, 1]));