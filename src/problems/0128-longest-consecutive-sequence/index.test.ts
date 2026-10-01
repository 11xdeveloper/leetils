import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestConsecutiveSequence } from ".";

const bySorting = (nums: number[]): number => {
	const sorted = [...new Set(nums)].toSorted((a, b) => a - b);
	let longest = 0;
	let length = 0;
	for (const [i, value] of sorted.entries()) {
		length = i > 0 && value === (sorted[i - 1] ?? 0) + 1 ? length + 1 : 1;
		longest = Math.max(longest, length);
	}
	return longest;
};

describe("128. Longest Consecutive Sequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestConsecutiveSequence([100, 4, 200, 1, 3, 2])).toBe(4);
		expect(longestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])).toBe(9);
		expect(longestConsecutiveSequence([1, 0, 1, 2])).toBe(3);
	});

	it("returns 0 for an empty array", () => {
		expect(longestConsecutiveSequence([])).toBe(0);
	});

	it("stays linear when many values repeat", () => {
		expect(
			longestConsecutiveSequence(
				Array.from({ length: 100_000 }, (_, i) => i % 50_000),
			),
		).toBe(50_000);
	});

	it("matches sorting on random inputs", () => {
		const random = createRandom(128);
		for (let run = 0; run < 500; run++) {
			const nums = random.array(random.int(0, 20), -15, 15);
			expect(longestConsecutiveSequence(nums)).toBe(bySorting(nums));
		}
	});
});
