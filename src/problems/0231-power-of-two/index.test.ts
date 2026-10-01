import { describe, expect, it } from "bun:test";
import { powerOfTwo } from ".";

describe("231. Power of Two", () => {
	it("solves the examples from the problem statement", () => {
		expect(powerOfTwo(1)).toBeTrue();
		expect(powerOfTwo(16)).toBeTrue();
		expect(powerOfTwo(3)).toBeFalse();
	});

	it("rejects zero and negative numbers", () => {
		expect(powerOfTwo(0)).toBeFalse();
		expect(powerOfTwo(-2)).toBeFalse();
		expect(powerOfTwo(-(2 ** 31))).toBeFalse();
	});

	it("accepts every power of two in the 32-bit range, and nothing near them", () => {
		for (let exponent = 0; exponent <= 30; exponent++) {
			const power = 2 ** exponent;
			expect(powerOfTwo(power)).toBeTrue();
			if (power > 2) {
				expect(powerOfTwo(power - 1)).toBeFalse();
				expect(powerOfTwo(power + 1)).toBeFalse();
			}
		}
		expect(powerOfTwo(2 ** 31 - 1)).toBeFalse();
	});
});
