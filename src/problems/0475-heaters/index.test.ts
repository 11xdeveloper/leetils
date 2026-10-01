import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { heaters as findRadius } from ".";

const byBruteForce = (houses: number[], heaters: number[]): number =>
	Math.max(
		...houses.map((house) =>
			Math.min(...heaters.map((heater) => Math.abs(heater - house))),
		),
	);

describe("475. Heaters", () => {
	it("solves the examples from the problem statement", () => {
		expect(findRadius([1, 2, 3], [2])).toBe(1);
		expect(findRadius([1, 2, 3, 4], [1, 4])).toBe(1);
		expect(findRadius([1, 5], [2])).toBe(3);
	});

	it("matches checking every heater for every house on random inputs", () => {
		const random = createRandom(475);
		for (let run = 0; run < 1000; run++) {
			const houses = random.array(random.int(1, 10), 1, 30);
			const heaters = random.array(random.int(1, 5), 1, 30);
			expect(findRadius(houses, heaters)).toBe(byBruteForce(houses, heaters));
		}
	});
});
