import { describe, expect, it } from "bun:test";
import { jumpGameII } from ".";

/** Dynamic programming: the fewest jumps to reach each index. */
const byDynamicProgramming = (nums: number[]): number => {
	const jumps = nums.map((_, i) => (i === 0 ? 0 : Number.POSITIVE_INFINITY));
	for (const [i, reach] of nums.entries()) {
		for (let j = i + 1; j <= i + reach && j < nums.length; j++) {
			jumps[j] = Math.min(jumps[j] ?? 0, (jumps[i] ?? 0) + 1);
		}
	}
	return jumps.at(-1) ?? 0;
};

describe("45. Jump Game II", () => {
	it("solves the examples from the problem statement", () => {
		expect(jumpGameII([2, 3, 1, 1, 4])).toBe(2);
		expect(jumpGameII([2, 3, 0, 1, 4])).toBe(2);
	});

	it("needs no jumps when already at the last index", () => {
		expect(jumpGameII([0])).toBe(0);
	});

	it("takes one jump when the first can reach the end", () => {
		expect(jumpGameII([10, 0, 0, 0])).toBe(1);
	});

	it("takes n - 1 jumps of length 1", () => {
		expect(jumpGameII([1, 1, 1, 1, 1])).toBe(4);
	});

	it("matches dynamic programming on random reachable inputs", () => {
		let seed = 45;
		for (let run = 0; run < 500; run++) {
			const nums = Array.from({ length: 1 + (run % 25) }, () => {
				seed = (seed * 1103515245 + 12345) % 2 ** 31;
				return 1 + (seed % 5);
			});
			expect(jumpGameII(nums)).toBe(byDynamicProgramming(nums));
		}
	});
});
