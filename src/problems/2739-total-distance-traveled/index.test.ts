import { describe, expect, it } from "bun:test";
import { totalDistanceTraveled as distanceTraveled } from ".";

/** Burns fuel a litre at a time. */
const byBruteForce = (main: number, extra: number): number => {
	let distance = 0;
	for (let used = 1; main > 0; used++) {
		main--;
		distance += 10;
		if (used % 5 === 0 && extra > 0) {
			main++;
			extra--;
		}
	}
	return distance;
};

describe("2739. Total Distance Traveled", () => {
	it("solves the examples from the problem statement", () => {
		expect(distanceTraveled(5, 10)).toBe(60);
		expect(distanceTraveled(1, 2)).toBe(10);
	});

	it("matches burning fuel a litre at a time", () => {
		for (let main = 1; main <= 40; main++)
			for (let extra = 1; extra <= 15; extra++)
				expect(distanceTraveled(main, extra)).toBe(byBruteForce(main, extra));
	});
});
