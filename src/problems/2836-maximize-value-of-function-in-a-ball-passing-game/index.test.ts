import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeValueOfFunctionInABallPassingGame as getMaxFunctionValue } from ".";

/** Passes the ball one step at a time. */
const byBruteForce = (receiver: number[], k: number): number =>
	Math.max(
		...receiver.map((_, start) => {
			let score = start;
			let at = start;
			for (let pass = 0; pass < k; pass++) {
				at = receiver[at] ?? 0;
				score += at;
			}
			return score;
		}),
	);

describe("2836. Maximize Value of Function in a Ball Passing Game", () => {
	it("solves the examples from the problem statement", () => {
		expect(getMaxFunctionValue([2, 0, 1], 4)).toBe(6);
		expect(getMaxFunctionValue([1, 1, 1, 2, 3], 3)).toBe(10);
	});

	it("matches passing step by step on random inputs", () => {
		const random = createRandom(2836);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 8);
			const receiver = random.array(n, 0, n - 1);
			const k = random.int(1, 70);
			expect(getMaxFunctionValue(receiver, k)).toBe(byBruteForce(receiver, k));
		}
	});

	it("handles huge k", () => {
		expect(getMaxFunctionValue([0], 10_000_000_000)).toBe(0);
		expect(getMaxFunctionValue([1, 1], 10_000_000_000)).toBe(10_000_000_001);
	});
});
