import { describe, expect, it } from "bun:test";
import { findAllPossibleStableBinaryArraysI as numberOfStableArrays } from ".";

/** Builds every arrangement. */
const byBruteForce = (zero: number, one: number, limit: number): number => {
	const count = (z: number, o: number, last: number, run: number): number => {
		if (z === 0 && o === 0) return 1;
		let total = 0;
		if (z > 0 && !(last === 0 && run === limit))
			total += count(z - 1, o, 0, last === 0 ? run + 1 : 1);
		if (o > 0 && !(last === 1 && run === limit))
			total += count(z, o - 1, 1, last === 1 ? run + 1 : 1);
		return total;
	};
	return count(zero, one, -1, 0);
};

describe("3129. Find All Possible Stable Binary Arrays I", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfStableArrays(1, 1, 2)).toBe(2);
		expect(numberOfStableArrays(1, 2, 1)).toBe(1);
		expect(numberOfStableArrays(3, 3, 2)).toBe(14);
	});

	it("matches building every arrangement", () => {
		for (let zero = 1; zero <= 6; zero++)
			for (let one = 1; one <= 6; one++)
				for (let limit = 1; limit <= 4; limit++)
					expect(numberOfStableArrays(zero, one, limit)).toBe(
						byBruteForce(zero, one, limit),
					);
	});

	it("reduces large counts modulo 10^9 + 7", () => {
		const result = numberOfStableArrays(200, 200, 50);
		expect(result).toBeGreaterThanOrEqual(0);
		expect(result).toBeLessThan(1_000_000_007);
	});
});
