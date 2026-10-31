import { describe, expect, it } from "bun:test";
import { findTheNumberOfPossibleWaysForAnEvent as numberOfWays } from ".";

/** Tries every assignment of performers to stages. */
const byBruteForce = (n: number, x: number, y: number): number => {
	let total = 0;
	for (let code = 0; code < x ** n; code++) {
		const used = new Set<number>();
		for (let rest = code, i = 0; i < n; i++, rest = Math.floor(rest / x))
			used.add(rest % x);
		total += y ** used.size;
	}
	return total;
};

describe("3317. Find the Number of Possible Ways for an Event", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfWays(1, 2, 3)).toBe(6);
		expect(numberOfWays(5, 2, 1)).toBe(32);
		expect(numberOfWays(3, 3, 4)).toBe(684);
	});

	it("matches trying every assignment for small inputs", () => {
		for (let n = 1; n <= 5; n++)
			for (let x = 1; x <= 4; x++)
				for (let y = 1; y <= 3; y++)
					expect(numberOfWays(n, x, y)).toBe(byBruteForce(n, x, y));
	});
});
