import { describe, expect, it } from "bun:test";
import { countNumbersWithUniqueDigits } from ".";

describe("357. Count Numbers with Unique Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(countNumbersWithUniqueDigits(2)).toBe(91);
		expect(countNumbersWithUniqueDigits(0)).toBe(1);
	});

	it("matches counting every number for n up to 6", () => {
		let count = 0;
		let limit = 1;
		for (let n = 0; n <= 6; n++) {
			for (let x = n === 0 ? 0 : limit / 10; x < limit; x++) {
				const digits = String(x);
				if (new Set(digits).size === digits.length) count++;
			}
			expect(countNumbersWithUniqueDigits(n)).toBe(count);
			limit *= 10;
		}
	});

	it("handles the constraint of 8 digits", () => {
		expect(countNumbersWithUniqueDigits(8)).toBe(2345851);
	});
});
