import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfPairsSatisfyingInequality as numberOfPairs } from ".";

describe("2426. Number of Pairs Satisfying Inequality", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfPairs([3, 2, 5], [2, 2, 1], 1)).toBe(3);
		expect(numberOfPairs([3, -1], [-2, 2], -1)).toBe(0);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(2426);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const nums1 = random.array(n, -10, 10);
			const nums2 = random.array(n, -10, 10);
			const diff = random.int(-10, 10);
			let expected = 0;
			for (let i = 0; i < n; i++)
				for (let j = i + 1; j < n; j++)
					if (
						(nums1[i] ?? 0) - (nums1[j] ?? 0) <=
						(nums2[i] ?? 0) - (nums2[j] ?? 0) + diff
					)
						expected++;
			expect(numberOfPairs(nums1, nums2, diff)).toBe(expected);
		}
	});
});
