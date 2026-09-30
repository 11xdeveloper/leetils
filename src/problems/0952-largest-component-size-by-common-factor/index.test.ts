import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largestComponentSizeByCommonFactor as largestComponentSize } from ".";

/** Breadth-first search, joining pairs with a gcd above 1. */
const byGcd = (nums: number[]): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	const seen = new Set<number>();
	let largest = 0;
	for (const [start] of nums.entries()) {
		if (seen.has(start)) continue;
		seen.add(start);
		const queue = [start];
		for (const i of queue) {
			for (const [j, other] of nums.entries()) {
				if (!seen.has(j) && gcd(nums[i] ?? 1, other) > 1) {
					seen.add(j);
					queue.push(j);
				}
			}
		}
		largest = Math.max(largest, queue.length);
	}
	return largest;
};

describe("952. Largest Component Size by Common Factor", () => {
	it("solves the examples from the problem statement", () => {
		expect(largestComponentSize([4, 6, 15, 35])).toBe(4);
		expect(largestComponentSize([20, 50, 9, 63])).toBe(2);
		expect(largestComponentSize([2, 3, 6, 7, 4, 12, 21, 39])).toBe(8);
	});

	it("matches joining pairs with a common factor on random inputs", () => {
		const random = createRandom(952);
		for (let run = 0; run < 500; run++) {
			const nums = [...new Set(random.array(random.int(1, 15), 1, 100))];
			expect(largestComponentSize(nums)).toBe(byGcd(nums));
		}
	});
});
