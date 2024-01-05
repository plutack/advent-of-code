const filepath: string = "textfile.txt";
const availableBalls: { red: number; blue: number; green: number } = {
	red: 12,
	blue: 14,
	green: 13,
};
const file = Bun.file(filepath);
await file.text().then((content) => {
	let matchValue: RegExpMatchArray | null;
	let gamenumber: number;
	let gameNumberTotal = 0;
	for (const line of content.split("\n")) {
		let redBalls = 0;
		let blueBalls = 0;
		let greenBalls = 0;
		matchValue = line.match(/(\d+) red/g);
		// console.log(matchValue);
		if (matchValue !== null) {
			for (const value of matchValue) {
				if (parseInt(value) > redBalls) {
					redBalls = parseInt(value);
				}
			}
		} else {
			redBalls = 0;
		}
		matchValue = line.match(/(\d+) blue/g);
		if (matchValue !== null) {
			for (const value of matchValue) {
				if (parseInt(value) > blueBalls) {
					blueBalls = parseInt(value);
				}
			}
		} else {
			blueBalls = 0;
		}
		matchValue = line.match(/(\d+) green/g);
		if (matchValue !== null) {
			for (const value of matchValue) {
				if (parseInt(value) > greenBalls) {
					greenBalls = parseInt(value);
				}
			}
		} else {
			greenBalls = 0;
		}
		const maxBalls = { red: redBalls, blue: blueBalls, green: greenBalls };
		gamenumber = redBalls * blueBalls * greenBalls;
		console.log(gamenumber);
		gameNumberTotal += gamenumber;
	}
	console.log(gameNumberTotal);
});

// function compare(pickedBalls: { red: number; blue: number; green: number }) {
// 	if (
// 		pickedBalls.red <= availableBalls.red &&
// 		pickedBalls.blue <= availableBalls.blue &&
// 		pickedBalls.green <= availableBalls.green
// 	) {
// 		return true;
// 	}
// }
