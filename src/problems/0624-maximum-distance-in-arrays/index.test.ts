import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumDistanceInArrays as maxDistance } from ".";

const byBruteForce = (arrays: number[][]): number => {
	let best = 0;
	for (const [i, a] of arrays.entries()) {
		for (const [j, b] of arrays.entries()) {
			if (i === j) continue;
			for (const x of a)
				for (const y of b) best = Math.max(best, Math.abs(x - y));
		}
	}
	return best;
};

describe("624. Maximum Distance in Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxDistance([
				[1, 2, 3],
				[4, 5],
				[1, 2, 3],
			]),
		).toBe(4);
		expect(maxDistance([[1], [1]])).toBe(0);
	});

	it("doesn't pair an array's minimum with its own maximum", () => {
		expect(maxDistance([[1, 100], [50]])).toBe(50);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(624);
		for (let run = 0; run < 500; run++) {
			const arrays = Array.from({ length: random.int(2, 5) }, () =>
				random.array(random.int(1, 4), -20, 20).sort((a, b) => a - b),
			);
			expect(maxDistance(arrays)).toBe(byBruteForce(arrays));
		}
	});
});
