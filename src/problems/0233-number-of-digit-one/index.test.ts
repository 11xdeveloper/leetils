import { describe, expect, it } from "bun:test";
import { numberOfDigitOne } from ".";

describe("233. Number of Digit One", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfDigitOne(13)).toBe(6);
		expect(numberOfDigitOne(0)).toBe(0);
	});

	it("matches counting the digits of every number up to 20,000", () => {
		let count = 0;
		for (let n = 0; n <= 20_000; n++) {
			count += String(n).replaceAll(/[^1]/g, "").length;
			expect(numberOfDigitOne(n)).toBe(count);
		}
	});

	it("handles the constraint of 10^9", () => {
		// Every place from 10^0 to 10^8 has a 1 in a tenth of 10^9 numbers, plus 10^9 itself.
		expect(numberOfDigitOne(1e9)).toBe(900_000_001);
	});
});
