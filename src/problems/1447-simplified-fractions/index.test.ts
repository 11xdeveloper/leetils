import { describe, expect, it } from "bun:test";
import { simplifiedFractions } from ".";

/** Keeps the first fraction seen for each value. */
const byBruteForce = (n: number): string[] => {
	const byValue = new Map<number, string>();
	for (let b = 2; b <= n; b++) {
		for (let a = 1; a < b; a++) {
			// Scaled to an integer key so equal values collide exactly.
			const key = Math.round((a / b) * 2 ** 40);
			if (!byValue.has(key)) byValue.set(key, `${a}/${b}`);
		}
	}
	return [...byValue.values()];
};

describe("1447. Simplified Fractions", () => {
	it("solves the examples from the problem statement", () => {
		expect(simplifiedFractions(2)).toEqual(["1/2"]);
		expect(simplifiedFractions(3).sort()).toEqual(["1/2", "1/3", "2/3"]);
		expect(simplifiedFractions(4).sort()).toEqual([
			"1/2",
			"1/3",
			"1/4",
			"2/3",
			"3/4",
		]);
	});

	it("returns nothing for n = 1", () => {
		expect(simplifiedFractions(1)).toEqual([]);
	});

	it("matches keeping one fraction per value up to 60", () => {
		for (const n of [5, 12, 30, 60]) {
			expect(simplifiedFractions(n).sort()).toEqual(byBruteForce(n).sort());
		}
	});
});
