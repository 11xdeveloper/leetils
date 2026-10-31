import { describe, expect, it } from "bun:test";
import { maximumNumberThatMakesResultOfBitwiseAndZero as maxNumber } from ".";

describe("3125. Maximum Number That Makes Result of Bitwise AND Zero", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxNumber(7)).toBe(3);
		expect(maxNumber(9)).toBe(7);
		expect(maxNumber(17)).toBe(15);
	});

	it("matches ANDing ranges", () => {
		for (let n = 1; n <= 300; n++) {
			let x = n;
			for (let and = n; and !== 0; ) and &= --x;
			expect(maxNumber(n)).toBe(x);
		}
	});

	it("handles n = 10^15", () => {
		expect(maxNumber(1e15)).toBe(2 ** 49 - 1);
	});
});
