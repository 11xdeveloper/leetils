import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countOfSubMultisetsWithBoundedSum as countSubMultisets } from ".";

/** Enumerates distinct sub-multisets via sorted keys. */
const byBruteForce = (nums: number[], l: number, r: number): number => {
	const seen = new Set<string>();
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		const subset = nums.filter((_, i) => (mask >> i) & 1).sort((a, b) => a - b);
		const sum = subset.reduce((s, x) => s + x, 0);
		if (sum >= l && sum <= r) seen.add(subset.join(","));
	}
	return seen.size;
};

describe("2902. Count of Sub-Multisets With Bounded Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubMultisets([1, 2, 2, 3], 6, 6)).toBe(1);
		expect(countSubMultisets([2, 1, 4, 2, 7], 1, 5)).toBe(7);
		expect(countSubMultisets([1, 2, 1, 3, 5, 2], 3, 5)).toBe(9);
	});

	it("matches enumerating sub-multisets on random inputs", () => {
		const random = createRandom(2902);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 10), 0, 5);
			const l = random.int(0, 10);
			const r = random.int(l, 15);
			expect(countSubMultisets(nums, l, r)).toBe(byBruteForce(nums, l, r));
		}
	});
});
