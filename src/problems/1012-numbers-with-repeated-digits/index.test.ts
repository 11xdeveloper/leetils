import { describe, expect, it } from "bun:test";
import { numbersWithRepeatedDigits as numDupDigitsAtMostN } from ".";

describe("1012. Numbers With Repeated Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(numDupDigitsAtMostN(20)).toBe(1);
		expect(numDupDigitsAtMostN(100)).toBe(10);
		expect(numDupDigitsAtMostN(1000)).toBe(262);
	});

	it("matches checking every number up to 20,000", () => {
		let count = 0;
		for (let n = 1; n <= 20_000; n++) {
			if (new Set(String(n)).size < String(n).length) count++;
			expect(numDupDigitsAtMostN(n)).toBe(count);
		}
	});

	it("handles the largest input", () => {
		expect(numDupDigitsAtMostN(10 ** 9)).toBe(994388230);
	});
});
