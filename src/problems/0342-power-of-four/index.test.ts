import { describe, expect, it } from "bun:test";
import { powerOfFour } from ".";

describe("342. Power of Four", () => {
	it("solves the examples from the problem statement", () => {
		expect(powerOfFour(16)).toBeTrue();
		expect(powerOfFour(5)).toBeFalse();
		expect(powerOfFour(1)).toBeTrue();
	});

	it("rejects powers of two that aren't powers of four", () => {
		for (let exponent = 1; exponent <= 30; exponent += 2)
			expect(powerOfFour(2 ** exponent)).toBeFalse();
	});

	it("accepts every power of four in the 32-bit range, and rejects zero and negatives", () => {
		for (let exponent = 0; exponent <= 15; exponent++)
			expect(powerOfFour(4 ** exponent)).toBeTrue();
		expect(powerOfFour(0)).toBeFalse();
		expect(powerOfFour(-4)).toBeFalse();
		expect(powerOfFour(-(2 ** 31))).toBeFalse();
	});
});
