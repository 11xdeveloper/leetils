import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfRobotsWithinBudget as maximumRobots } from ".";

/** Checks every window. */
const byBruteForce = (
	charge: number[],
	running: number[],
	budget: number,
): number => {
	let best = 0;
	for (let i = 0; i < charge.length; i++) {
		for (let j = i; j < charge.length; j++) {
			const k = j - i + 1;
			const cost =
				Math.max(...charge.slice(i, j + 1)) +
				k * running.slice(i, j + 1).reduce((s, v) => s + v, 0);
			if (cost <= budget) best = Math.max(best, k);
		}
	}
	return best;
};

describe("2398. Maximum Number of Robots Within Budget", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumRobots([3, 6, 1, 3, 4], [2, 1, 3, 4, 5], 25)).toBe(3);
		expect(maximumRobots([11, 12, 19], [10, 8, 7], 19)).toBe(0);
	});

	it("matches checking every window on random inputs", () => {
		const random = createRandom(2398);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const charge = random.array(n, 1, 10);
			const running = random.array(n, 1, 5);
			const budget = random.int(1, 80);
			expect(maximumRobots(charge, running, budget)).toBe(
				byBruteForce(charge, running, budget),
			);
		}
	});
});
