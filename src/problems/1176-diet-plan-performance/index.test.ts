import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { dietPlanPerformance } from ".";

/** Sums each window separately. */
const byBruteForce = (
	calories: number[],
	k: number,
	lower: number,
	upper: number,
) => {
	let points = 0;
	for (let i = 0; i + k <= calories.length; i++) {
		const total = calories.slice(i, i + k).reduce((sum, c) => sum + c, 0);
		if (total < lower) points--;
		else if (total > upper) points++;
	}
	return points;
};

describe("1176. Diet Plan Performance", () => {
	it("solves the examples from the problem statement", () => {
		expect(dietPlanPerformance([1, 2, 3, 4, 5], 1, 3, 3)).toBe(0);
		expect(dietPlanPerformance([3, 2], 2, 0, 1)).toBe(1);
		expect(dietPlanPerformance([6, 5, 0, 0], 2, 1, 5)).toBe(0);
	});

	it("matches summing every window on random inputs", () => {
		const random = createRandom(1176);
		for (let run = 0; run < 300; run++) {
			const calories = random.array(random.int(1, 15), 0, 10);
			const k = random.int(1, calories.length);
			const lower = random.int(0, 10 * k);
			const upper = random.int(lower, 10 * k);
			expect(dietPlanPerformance(calories, k, lower, upper)).toBe(
				byBruteForce(calories, k, lower, upper),
			);
		}
	});
});
