import { describe, expect, it } from "bun:test";
import { numberOfWaysToRearrangeSticksWithKSticksVisible as rearrangeSticks } from ".";

/** Counts visible sticks in every permutation. */
const byBruteForce = (n: number, k: number): number => {
	let count = 0;
	const permute = (left: number[], tallest: number, visible: number) => {
		if (left.length === 0) {
			if (visible === k) count++;
			return;
		}
		for (const [i, stick] of left.entries()) {
			permute(
				left.filter((_, j) => j !== i),
				Math.max(tallest, stick),
				visible + (stick > tallest ? 1 : 0),
			);
		}
	};
	permute(
		Array.from({ length: n }, (_, i) => i + 1),
		0,
		0,
	);
	return count;
};

describe("1866. Number of Ways to Rearrange Sticks With K Sticks Visible", () => {
	it("solves the examples from the problem statement", () => {
		expect(rearrangeSticks(3, 2)).toBe(3);
		expect(rearrangeSticks(5, 5)).toBe(1);
		expect(rearrangeSticks(20, 11)).toBe(647427950);
	});

	it("matches counting every permutation for small n", () => {
		for (let n = 1; n <= 7; n++)
			for (let k = 1; k <= n; k++)
				expect(rearrangeSticks(n, k)).toBe(byBruteForce(n, k));
	});

	it("handles the largest input", () => {
		expect(rearrangeSticks(1000, 1)).toBeLessThan(1_000_000_007);
	});
});
