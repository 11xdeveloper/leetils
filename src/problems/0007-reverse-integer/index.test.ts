import { describe, expect, it } from "bun:test";
import { reverseInteger } from ".";

const INT_MAX = 2 ** 31 - 1;
const INT_MIN = -(2 ** 31);

const byString = (x: number): number => {
	const reversed =
		Math.sign(x) * Number(String(Math.abs(x)).split("").reverse().join(""));
	return reversed > INT_MAX || reversed < INT_MIN ? 0 : reversed || 0;
};

describe("7. Reverse Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverseInteger(123)).toBe(321);
		expect(reverseInteger(-123)).toBe(-321);
		expect(reverseInteger(120)).toBe(21);
	});

	it("handles zero and single digits", () => {
		expect(reverseInteger(0)).toBe(0);
		expect(reverseInteger(7)).toBe(7);
		expect(reverseInteger(-7)).toBe(-7);
	});

	it("drops trailing zeros", () => {
		expect(reverseInteger(1000)).toBe(1);
		expect(reverseInteger(-1020)).toBe(-201);
	});

	it("returns 0 when the result overflows 32 bits", () => {
		expect(reverseInteger(1534236469)).toBe(0);
		expect(reverseInteger(INT_MAX)).toBe(0);
		expect(reverseInteger(INT_MIN)).toBe(0);
		expect(reverseInteger(1563847412)).toBe(0);
	});

	it("keeps results just inside the 32-bit range", () => {
		expect(reverseInteger(1463847412)).toBe(2147483641);
		expect(reverseInteger(-1463847412)).toBe(-2147483641);
	});

	it("agrees with reversing the digits as a string", () => {
		let x = 7;
		for (let run = 0; run < 2000; run++) {
			x = (x * 1103515245 + 12345) % INT_MAX;
			expect(reverseInteger(x)).toBe(byString(x));
			expect(reverseInteger(-x)).toBe(byString(-x));
		}
	});
});
