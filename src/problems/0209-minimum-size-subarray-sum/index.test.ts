import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSizeSubarraySum } from ".";

const byBruteForce = (target: number, nums: number[]): number => {
	let shortest = 0;
	for (let i = 0; i < nums.length; i++) {
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += nums[j] ?? 0;
			if (sum >= target) {
				if (shortest === 0 || j - i + 1 < shortest) shortest = j - i + 1;
				break;
			}
		}
	}
	return shortest;
};

describe("209. Minimum Size Subarray Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSizeSubarraySum(7, [2, 3, 1, 2, 4, 3])).toBe(2);
		expect(minimumSizeSubarraySum(4, [1, 4, 4])).toBe(1);
		expect(minimumSizeSubarraySum(11, [1, 1, 1, 1, 1, 1, 1, 1])).toBe(0);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(209);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 15), 1, 6);
			const target = random.int(1, 40);
			expect(minimumSizeSubarraySum(target, nums)).toBe(
				byBruteForce(target, nums),
			);
		}
	});
});
