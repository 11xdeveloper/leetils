import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { productOfArrayExceptSelf } from ".";

const byBruteForce = (nums: number[]): number[] =>
	nums.map(
		(_, i) =>
			nums.reduce(
				(product, num, j) => (i === j ? product : product * num),
				1,
			) || 0,
	);

describe("238. Product of Array Except Self", () => {
	it("solves the examples from the problem statement", () => {
		expect(productOfArrayExceptSelf([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
		expect(productOfArrayExceptSelf([-1, 1, 0, -3, 3])).toEqual([
			0, 0, 9, 0, 0,
		]);
	});

	it("handles two zeros", () => {
		expect(productOfArrayExceptSelf([0, 4, 0])).toEqual([0, 0, 0]);
	});

	it("matches multiplying everything else on random inputs", () => {
		const random = createRandom(238);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(2, 10), -3, 3);
			expect(productOfArrayExceptSelf(nums)).toEqual(byBruteForce(nums));
		}
	});
});
