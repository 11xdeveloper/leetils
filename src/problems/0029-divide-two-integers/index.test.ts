import { describe, expect, it } from "bun:test";
import { divideTwoIntegers } from ".";

const INT_MAX = 2 ** 31 - 1;
const INT_MIN = -(2 ** 31);

const byTruncation = (dividend: number, divisor: number): number =>
	Math.min(Math.trunc(dividend / divisor), INT_MAX) || 0;

describe("29. Divide Two Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(divideTwoIntegers(10, 3)).toBe(3);
		expect(divideTwoIntegers(7, -3)).toBe(-2);
	});

	it("truncates towards zero for every sign combination", () => {
		expect(divideTwoIntegers(7, 2)).toBe(3);
		expect(divideTwoIntegers(-7, 2)).toBe(-3);
		expect(divideTwoIntegers(7, -2)).toBe(-3);
		expect(divideTwoIntegers(-7, -2)).toBe(3);
	});

	it("returns 0, never -0, when the divisor is larger", () => {
		expect(divideTwoIntegers(0, -5)).toBe(0);
		expect(divideTwoIntegers(1, -2)).toBe(0);
		expect(divideTwoIntegers(-1, 2)).toBe(0);
	});

	it("clamps the one overflowing quotient", () => {
		expect(divideTwoIntegers(INT_MIN, -1)).toBe(INT_MAX);
	});

	it("handles the 32-bit limits", () => {
		expect(divideTwoIntegers(INT_MIN, 1)).toBe(INT_MIN);
		expect(divideTwoIntegers(INT_MAX, 1)).toBe(INT_MAX);
		expect(divideTwoIntegers(INT_MAX, -1)).toBe(-INT_MAX);
		expect(divideTwoIntegers(INT_MIN, INT_MIN)).toBe(1);
		expect(divideTwoIntegers(INT_MAX, INT_MIN)).toBe(0);
		expect(divideTwoIntegers(INT_MIN, 2)).toBe(-(2 ** 30));
	});

	it("agrees with Math.trunc on random inputs", () => {
		let seed = 29;
		const next = () => {
			seed = (seed * 1103515245 + 12345) % 2 ** 31;
			return seed;
		};
		for (let run = 0; run < 2000; run++) {
			const dividend = next() - 2 ** 30;
			const divisor = ((next() % 2000) + 1) * (next() % 2 === 0 ? 1 : -1);
			expect(divideTwoIntegers(dividend, divisor)).toBe(
				byTruncation(dividend, divisor),
			);
		}
	});
});
