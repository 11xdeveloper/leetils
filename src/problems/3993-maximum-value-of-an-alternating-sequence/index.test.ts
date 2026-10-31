import { describe, expect, it } from "bun:test";
import { maximumValueOfAnAlternatingSequence as maximumValue } from ".";

/** Explores every sequence of small steps. */
const byBruteForce = (n: number, s: number, m: number): number => {
	let best = s;
	const go = (length: number, value: number, rising: number): void => {
		best = Math.max(best, value);
		if (length === n) return;
		for (let d = 1; d <= m; d++)
			for (const sign of rising === 0 ? [1, -1] : [rising])
				go(length + 1, value + sign * d, -sign);
	};
	go(1, s, 0);
	return best;
};

describe("3993. Maximum Value of an Alternating Sequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumValue(4, 3, 5)).toBe(12);
		expect(maximumValue(2, 4, 3)).toBe(7);
	});

	it("matches exploring every sequence", () => {
		for (let n = 1; n <= 6; n++)
			for (let m = 1; m <= 3; m++)
				expect(maximumValue(n, 5, m)).toBe(byBruteForce(n, 5, m));
	});
});
