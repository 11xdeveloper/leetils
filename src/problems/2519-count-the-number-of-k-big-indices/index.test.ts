import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countTheNumberOfKBigIndices as kBigIndices } from ".";

/** Counts smaller values on each side directly. */
const byBruteForce = (nums: number[], k: number): number =>
	nums.filter(
		(value, i) =>
			nums.slice(0, i).filter((v) => v < value).length >= k &&
			nums.slice(i + 1).filter((v) => v < value).length >= k,
	).length;

describe("2519. Count the Number of K-Big Indices", () => {
	it("solves the examples from the problem statement", () => {
		expect(kBigIndices([2, 3, 6, 5, 2, 3], 2)).toBe(2);
		expect(kBigIndices([1, 1, 1], 3)).toBe(0);
	});

	it("matches counting directly on random inputs", () => {
		const random = createRandom(2519);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 12);
			const nums = random.array(n, 1, n);
			const k = random.int(1, 4);
			expect(kBigIndices(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
