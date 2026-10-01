import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSumObtainedOfAnyPermutation as maxSumRangeQuery } from ".";

/** Tries every permutation. */
const byBruteForce = (nums: number[], requests: number[][]): number => {
	let best = 0;
	const permute = (prefix: number[], rest: number[]): void => {
		if (rest.length === 0) {
			const total = requests.reduce(
				(sum, [s = 0, e = 0]) =>
					sum + prefix.slice(s, e + 1).reduce((a, b) => a + b, 0),
				0,
			);
			best = Math.max(best, total);
			return;
		}
		rest.forEach((value, i) => {
			permute(
				[...prefix, value],
				rest.filter((_, j) => j !== i),
			);
		});
	};
	permute([], nums);
	return best;
};

describe("1589. Maximum Sum Obtained of Any Permutation", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxSumRangeQuery(
				[1, 2, 3, 4, 5],
				[
					[1, 3],
					[0, 1],
				],
			),
		).toBe(19);
		expect(maxSumRangeQuery([1, 2, 3, 4, 5, 6], [[0, 1]])).toBe(11);
		expect(
			maxSumRangeQuery(
				[1, 2, 3, 4, 5, 10],
				[
					[0, 2],
					[1, 3],
					[1, 1],
				],
			),
		).toBe(47);
	});

	it("matches trying every permutation on random inputs", () => {
		const random = createRandom(1589);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 6), 0, 10);
			const requests = Array.from({ length: random.int(1, 4) }, () => {
				const [a, b] = [
					random.int(0, nums.length - 1),
					random.int(0, nums.length - 1),
				];
				return [Math.min(a, b), Math.max(a, b)];
			});
			expect(maxSumRangeQuery(nums, requests)).toBe(
				byBruteForce(nums, requests),
			);
		}
	});
});
