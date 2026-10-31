import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumTotalValueOfCoveredIndices as maxTotal } from ".";

/** Tries every choice of moves. */
const byBruteForce = (nums: number[], s: string): number => {
	const tokens = [...s].flatMap((c, i) => (c === "1" ? [i] : []));
	let best = 0;
	for (let mask = 0; mask < 1 << tokens.length; mask++) {
		if (tokens.some((t, k) => (mask >> k) & 1 && t === 0)) continue;
		const covered = new Set(
			tokens.map((t, k) => ((mask >> k) & 1 ? t - 1 : t)),
		);
		best = Math.max(
			best,
			[...covered].reduce((sum, i) => sum + (nums[i] ?? 0), 0),
		);
	}
	return best;
};

describe("3952. Maximum Total Value of Covered Indices", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxTotal([9, 2, 6, 1], "0101")).toBe(15);
		expect(maxTotal([5, 1, 4], "001")).toBe(4);
		expect(maxTotal([9, 3, 5], "011")).toBe(14);
	});

	it("matches trying every move on random input", () => {
		const random = createRandom(3952);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const nums = random.array(n, 1, 9);
			const s = random.string(n, "01");
			expect(maxTotal(nums, s)).toBe(byBruteForce(nums, s));
		}
	});
});
