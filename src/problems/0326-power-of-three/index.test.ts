import { describe, expect, it } from "bun:test";
import { powerOfThree } from ".";

describe("326. Power of Three", () => {
	it("solves the examples from the problem statement", () => {
		expect(powerOfThree(27)).toBeTrue();
		expect(powerOfThree(0)).toBeFalse();
		expect(powerOfThree(-1)).toBeFalse();
	});

	it("accepts every power of three in the 32-bit range, and nothing near them", () => {
		for (let power = 1; power <= 2 ** 31; power *= 3) {
			expect(powerOfThree(power)).toBeTrue();
			if (power > 3) {
				expect(powerOfThree(power - 1)).toBeFalse();
				expect(powerOfThree(power + 1)).toBeFalse();
			}
		}
		expect(powerOfThree(45)).toBeFalse();
		expect(powerOfThree(2 ** 31 - 1)).toBeFalse();
	});
});
