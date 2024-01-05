const balls = { red: 12, blue: 14, green: 13 };

async function isPossible(filePath: string) {
	let gameNumberTotal = 0;
	const file = Bun.file(filePath);
	const fileLine = (await file.text()).split("\n");
	try {
		for (let line of fileLine) {
			let gameNumber = Number(line.match(/Game\s(\d+)/)?.[1]);
			// console.log(gameNumber)
			gameNumberTotal = pickedBalls(line, gameNumber, gameNumberTotal);
			// console.log(gameNumberTotal)
		}
		return gameNumberTotal;
	} catch (error) {
		console.error("Error reading file:", error);
	}
}

function pickedBalls(
	gameData: string,
	gameNumber: number,
	gameNumberTotal: number,
): number {
	let matchValue: any;
	let isTrue = true;
	const gameDataArray = gameData.replace(/game\s\d+:/i, "").split(";");
	for (const set of gameDataArray) {
		let redBalls = 0;
		let blueBalls = 0;
		let greenBalls = 0;
		matchValue = set.match(/\d+ red/g);
		// console.log(matchValue)
		if (matchValue !== null) {
			for (let value of matchValue) {
				redBalls += parseInt(value);
			}
		}
		matchValue = set.match(/\d+ blue/g);
		if (matchValue !== null) {
			for (let value of matchValue) {
				blueBalls += parseInt(value);
			}
		}
		matchValue = set.match(/\d+ green/g);
		if (matchValue !== null) {
			for (let value of matchValue) {
				greenBalls += parseInt(value);
			}
		}
		console.log({ red: redBalls, blue: blueBalls, green: greenBalls });
		if (compare({ red: redBalls, blue: blueBalls, green: greenBalls })) {
			isTrue = true;
		} else {
			isTrue = false;
			break;
		}
	}
	// console.log(isTrue)
	if (isTrue) {
		gameNumberTotal += gameNumber;
	}
	return gameNumberTotal;
}

function compare(gameData: {
	red: number;
	blue: number;
	green: number;
}): boolean {
	if (gameData.red > balls.red) {
		return false;
	}
	if (gameData.blue > balls.blue) {
		return false;
	}
	if (gameData.green > balls.green) {
		return false;
	} else return true;
}

// const filePath = "./test.txt";
const filePath = "./textfile.txt";
isPossible(filePath).then((result) => console.log(result));
