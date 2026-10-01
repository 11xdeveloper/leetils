import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { smallestRotationWithHighestScore as bestRotation } from ".";

const byBruteForce = (nums: number[]): number => {
	let best = 0;
	let bestScore = -1;
	for (let k = 0; k < nums.length; k++) {
		const rotated = [...nums.slice(k), ...nums.slice(0, k)];
		const score = rotated.filter((num, i) => num <= i).length;
		if (score > bestScore) [best, bestScore] = [k, score];
	}
	return best;
};

describe("798. Smallest Rotation with Highest Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(bestRotation([2, 3, 1, 4, 0])).toBe(3);
		expect(bestRotation([1, 3, 0, 2, 4])).toBe(0);
	});

	it("matches scoring every rotation on random inputs", () => {
		const random = createRandom(798);
		for (let run = 0; run < 1000; run++) {
			const n = random.int(1, 10);
			const nums = random.array(n, 0, n - 1);
			expect(bestRotation(nums)).toBe(byBruteForce(nums));
		}
	});
});
