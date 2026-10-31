import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSumAfterDivisibleSumDeletions as minArraySum } from ".";

/** Searches every sequence of deletions. */
const byBruteForce = (nums: number[], k: number): number => {
	const seen = new Set<string>();
	let best = Number.POSITIVE_INFINITY;
	const go = (arr: number[]): void => {
		const key = arr.join();
		if (seen.has(key)) return;
		seen.add(key);
		best = Math.min(
			best,
			arr.reduce((a, b) => a + b, 0),
		);
		for (let i = 0; i < arr.length; i++) {
			let sum = 0;
			for (let j = i; j < arr.length; j++) {
				sum += arr[j] ?? 0;
				if (sum % k === 0) go([...arr.slice(0, i), ...arr.slice(j + 1)]);
			}
		}
	};
	go(nums);
	return best;
};

describe("3654. Minimum Sum After Divisible Sum Deletions", () => {
	it("solves the examples from the problem statement", () => {
		expect(minArraySum([1, 1, 1], 2)).toBe(1);
		expect(minArraySum([3, 1, 4, 1, 5], 3)).toBe(5);
	});

	it("matches searching every deletion on random arrays", () => {
		const random = createRandom(3654);
		for (let run = 0; run < 150; run++) {
			const nums = random.array(random.int(1, 7), 1, 9);
			const k = random.int(1, 6);
			expect(minArraySum(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
