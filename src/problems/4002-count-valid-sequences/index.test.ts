import { describe, expect, it } from "bun:test";
import { countValidSequences } from ".";

/** Builds every composition. */
const byBruteForce = (n: number, k: number): number => {
	let count = 0;
	const go = (left: number, parts: number, even: boolean): void => {
		if (parts === 0) {
			if (left === 0 && even) count++;
			return;
		}
		for (let x = 1; x <= left; x++)
			go(left - x, parts - 1, even || x % 2 === 0);
	};
	go(n, k, false);
	return count;
};

describe("4002. Count Valid Sequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(countValidSequences(5, 3)).toBe(3);
		expect(countValidSequences(3, 2)).toBe(2);
		expect(countValidSequences(5, 5)).toBe(0);
	});

	it("matches building every composition", () => {
		for (let n = 1; n <= 12; n++)
			for (let k = 1; k <= n; k++)
				expect(countValidSequences(n, k)).toBe(byBruteForce(n, k));
	});
});
