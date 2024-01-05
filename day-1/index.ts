async function readfile(filepath: string) {
	let codeNumber = 0;
	const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	const numberInWord = {
		zero: "z0o",
		one: "o1e",
		two: "t2o",
		three: "t3e",
		four: "f4r",
		five: "f5e",
		six: "s6x",
		seven: "s7n",
		eight: "e8t",
		nine: "n9e",
	};
	const file = Bun.file(filepath);
	const fileLine = (await file.text()).split("\n");
	try {
		for (let line of fileLine) {
			let firstNumber: string;
			let lastNumber: string;
			for (const [key, value] of Object.entries(numberInWord)) {
				if (line.includes(key)) {
					line = line.replace(new RegExp(key, "g"), value);
				}
			}

			for (let i = 0; i < line.length; i++) {
				if (number.includes(line[i])) {
					firstNumber = line[i];
					break;
				}
			}
			for (let i = line.length - 1; i >= 0; i--) {
				if (number.includes(line[i])) {
					lastNumber = line[i];
					break;
				}
			}
			console.log(firstNumber, lastNumber);
			codeNumber += parseInt(firstNumber + lastNumber);
		}

		console.log(codeNumber);
	} catch (error) {
		console.error("Error reading file:", error);
	}
}

async function readfileV2(filepath: string) {
	let codeNumber = 0;
	const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	const file = Bun.file(filepath);
	const fileLine = (await file.text()).split("\n");
	try {
		for await (const line of fileLine) {
			let firstNumber: string;
			let lastNumber: string;
			for (let i = 0; i < line.length; i++) {
				if (number.includes(line[i])) {
					firstNumber = line[i];
					break;
				}
			}
			for (let i = line.length - 1; i >= 0; i--) {
				if (number.includes(line[i])) {
					lastNumber = line[i];
					break;
				}
			}
			codeNumber += parseInt(firstNumber + lastNumber);
		}

		console.log(codeNumber);
	} catch (error) {
		console.error("Error reading file:", error);
	}
}

const filePath = "./test.txt";
readfile(filePath);
