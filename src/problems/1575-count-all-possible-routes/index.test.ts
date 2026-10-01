import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countAllPossibleRoutes as countRoutes } from ".";

/** Follows every route recursively. */
const byBruteForce = (
	locations: number[],
	city: number,
	finish: number,
	fuel: number,
): number => {
	let count = city === finish ? 1 : 0;
	locations.forEach((location, next) => {
		const cost = Math.abs((locations[city] ?? 0) - location);
		if (next !== city && cost <= fuel)
			count += byBruteForce(locations, next, finish, fuel - cost);
	});
	return count;
};

describe("1575. Count All Possible Routes", () => {
	it("solves the examples from the problem statement", () => {
		expect(countRoutes([2, 3, 6, 8, 4], 1, 3, 5)).toBe(4);
		expect(countRoutes([4, 3, 1], 1, 0, 6)).toBe(5);
		expect(countRoutes([5, 2, 1], 0, 2, 3)).toBe(0);
	});

	it("matches following every route on random inputs", () => {
		const random = createRandom(1575);
		for (let run = 0; run < 200; run++) {
			const locations = [...new Set(random.array(random.int(2, 5), 1, 10))];
			if (locations.length < 2) continue;
			const [start, finish] = [
				random.int(0, locations.length - 1),
				random.int(0, locations.length - 1),
			];
			const fuel = random.int(1, 8);
			expect(countRoutes(locations, start, finish, fuel)).toBe(
				byBruteForce(locations, start, finish, fuel),
			);
		}
	});
});
