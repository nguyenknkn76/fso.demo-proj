// const multiplicator = (a: number, b: number, printText: string) => {
//   console.log(printText,  a * b);
// };
// const calculator = (a: number, b: number, op: Operation) : Result => {
// const calculator = (a: number, b: number, op: Operation) : number | string => {
//   if (op === 'multiply') {
//     return a * b;
//   } else if (op === 'divide') {
//     if (b == 0) return 'this cannot be done';
//     return a / b;
//   } else if (op === 'add') {
//     return a + b;
//   } else if (op === 'substract') {
//     return a - b;
//   } else {
//     throw new Error('Unknown operation');
//   }
// };
export const calculator2 = (a, b, op) => {
    switch (op) {
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0)
                return 'this cannot be done';
            return a / b;
        case 'add':
            return a + b;
        case 'substract':
            return a - b;
        default:
            throw new Error('Unknown operation');
    }
};
const parseArguments = (args) => {
    if (args.length < 4)
        throw new Error('Not enough arguments');
    if (args.length > 4)
        throw new Error('Too many arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    }
    else
        throw new Error('Provided values were not numbers');
};
const multiplicator2 = (a, b, printText) => {
    console.log(printText + ` ${a * b}`);
};
// console.log(process.argv);
// const number1 : number = Number(process.argv[2]);
// const number2 : number = Number(process.argv[3]);
// // console.log('this is result', number1*number2);
// // console.log(multiplicator2(number1, number2));
try {
    const { value1, value2 } = parseArguments(process.argv);
    multiplicator2(value1, value2, 'the result is:');
}
catch (error) {
    let errorMessage = "Something went wrong:";
    if (error instanceof Error) {
        errorMessage += ` Error:` + ` ${error.message}`;
    }
    console.log(errorMessage);
}
/*
* Note:
* - instanceof be used to narrow the type
*/
// multiplicator(5 , 4, 'Multiplied numbers 2 and 4, the result is:');
// const printText : string = `${calculator2(5, 3, 'add')}`;
// console.log('Result is: ', printText);
