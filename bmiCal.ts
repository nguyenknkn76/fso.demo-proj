export const calBMI = (w: number, h: number) : number => {
  return w / (h*h);
}

try {
  const weight : number = Number(process.argv[2]);
  const height : number = Number(process.argv[3]);
  const bmi = calBMI(weight, height);
  console.log(`Your BMI is: ${bmi}`);
  if (bmi < 18.5) {
    console.log('You are underweight');
  } else if (bmi >= 18.5 && bmi < 24.9) {
    console.log('You have a normal weight');
  } else if (bmi >= 25 && bmi < 29.9) {
    console.log('You are overweight');
  } else {
    throw new Error('You are obese');
  }
} catch (error) {
  let errorMessage = "Something went wrong:";
  if(error instanceof Error){
    errorMessage += `${error.message}`;
  };
  console.log(errorMessage);
}
// console.log(calBMI(weight, height));