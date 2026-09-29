import { describe, expect, it } from "bun:test";
import { powxN } from ".";

const INT_MAX = 2 ** 31 - 1;
const INT_MIN = -(2 ** 31);

/** Within the 1e-5 LeetCode allows, or a tighter relative error for large results. */
const expectClose = (actual: number, expected: number): void => {
	expect(Math.abs(actual - expected)).toBeLessThanOrEqual(
		Math.max(1e-5, Math.abs(expected) * 1e-12),
	);
};

describe("50. Pow(x, n)", () => {
	it("solves the examples from the problem statement", () => {
		expect(powxN(2, 10)).toBe(1024);
		expectClose(powxN(2.1, 3), 9.261);
		expect(powxN(2, -2)).toBe(0.25);
	});

	it("returns 1 for an exponent of 0", () => {
		expect(powxN(0.5, 0)).toBe(1);
		expect(powxN(-7, 0)).toBe(1);
	});

	it("keeps the sign of negative bases for odd exponents only", () => {
		expect(powxN(-2, 3)).toBe(-8);
		expect(powxN(-2, 4)).toBe(16);
		expect(powxN(-1, INT_MAX)).toBe(-1);
		expect(powxN(-1, INT_MIN)).toBe(1);
	});

	it("handles exponents at the 32-bit limits", () => {
		expect(powxN(1, INT_MIN)).toBe(1);
		expect(powxN(2, INT_MIN)).toBe(0);
		expect(powxN(0.00001, INT_MAX)).toBe(0);
	});

	it("agrees with Math.pow on random inputs within the constraints", () => {
		let seed = 50;
		const next = () => {
			seed = (seed * 1103515245 + 12345) % 2 ** 31;
			return seed;
		};
		for (let run = 0; run < 1000; run++) {
			const x = ((next() % 4000) - 2000) / 1000;
			const n = (next() % 41) - 20;
			if (x === 0 && n <= 0) continue;
			const expected = x ** n;
			if (Math.abs(expected) > 1e4) continue;
			expectClose(powxN(x, n), expected);
		}
	});
});
