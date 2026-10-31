import { describe, expect, it } from "bun:test";
import { countNumbersWithUniqueDigitsII as numberCount } from ".";

describe("3032. Count Numbers With Unique Digits II", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberCount(1, 20)).toBe(19);
		expect(numberCount(9, 19)).toBe(10);
		expect(numberCount(80, 120)).toBe(27);
	});

	it("matches checking digits with a set", () => {
		let count = 0;
		for (let num = 1; num <= 1000; num++)
			if (new Set(String(num)).size === String(num).length) count++;
		expect(numberCount(1, 1000)).toBe(count);
	});
});
