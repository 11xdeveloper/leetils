import { describe, expect, it } from "bun:test";
import { findTheCountOfGoodIntegers as countGoodIntegers } from ".";

/** Checks every n-digit number's digits against every palindrome. */
const byBruteForce = (n: number, k: number): number => {
	const good = new Set<string>();
	for (let x = 10 ** (n - 1); x < 10 ** n; x++) {
		const s = String(x);
		if (x % k === 0 && s === [...s].reverse().join(""))
			good.add([...s].sort().join(""));
	}
	let count = 0;
	for (let x = 10 ** (n - 1); x < 10 ** n; x++)
		if (good.has([...String(x)].sort().join(""))) count++;
	return count;
};

describe("3272. Find the Count of Good Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(countGoodIntegers(3, 5)).toBe(27);
		expect(countGoodIntegers(1, 4)).toBe(2);
		expect(countGoodIntegers(5, 6)).toBe(2468);
	});

	it("matches checking every number for small n", () => {
		for (let n = 1; n <= 4; n++)
			for (let k = 1; k <= 9; k++)
				expect(countGoodIntegers(n, k)).toBe(byBruteForce(n, k));
	});
});
