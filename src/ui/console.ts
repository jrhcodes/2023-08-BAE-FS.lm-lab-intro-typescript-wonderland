/* 
	Let's keep the actual console-based code isolated from the rest of the app with some handy wrappers.
*/

import * as readline from 'node:readline';

export function print(str: string): void {
	console.log(str);
	console.log();
}

export function clear(addTopBorder: boolean): void {
	console.clear();
	if (addTopBorder) {
		print('------------------------------------');
	}
}

// NOTE: this "createInterface" function is built into node and is referring to the console interface - NOT a TypeScript interface!
const reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// this function allows us to prompt the user with a question, and call a callback function with whatever string has been input
export function askQuestion(question: string, callback: (arg: string) => void) {

	reader.question(`❓ ${question} 👉 `, callback);

}

export const pressAKeyToContinue = (callback: (answer:string)=> void) => reader.question('Press any key to continue...', callback);

export const interfaceClose = () => reader.close();
