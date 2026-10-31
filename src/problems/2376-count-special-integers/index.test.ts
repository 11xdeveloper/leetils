import { describe, expect, it } from "bun:test";
import { countSpecialIntegers } from ".";

describe("2376. Count Special Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSpecialIntegers(20)).toBe(19);
		expect(countSpecialIntegers(5)).toBe(5);
		expect(countSpecialIntegers(135)).toBe(110);
	});

	it("matches checking every number up to 3000", () => {
		let expected = 0;
		for (let n = 1; n <= 3000; n++) {
			if (new Set(String(n)).size === String(n).length) expected++;
			expect(countSpecialIntegers(n)).toBe(expected);
		}
	});
});
