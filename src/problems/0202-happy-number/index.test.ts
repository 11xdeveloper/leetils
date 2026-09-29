import { describe, expect, it } from "bun:test";
import { happyNumber } from ".";

// The happy numbers up to 100, from OEIS A007770.
const HAPPY_UP_TO_100 = [
	1, 7, 10, 13, 19, 23, 28, 31, 32, 44, 49, 68, 70, 79, 82, 86, 91, 94, 97, 100,
];

describe("202. Happy Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(happyNumber(19)).toBe(true);
		expect(happyNumber(2)).toBe(false);
	});

	it("treats 1 as happy", () => {
		expect(happyNumber(1)).toBe(true);
	});

	it("detects cycles that never reach 1", () => {
		expect(happyNumber(4)).toBe(false);
		expect(happyNumber(89)).toBe(false);
		expect(happyNumber(999)).toBe(false);
	});

	it("identifies exactly the happy numbers up to 100", () => {
		for (let n = 1; n <= 100; n++) {
			expect(happyNumber(n)).toBe(HAPPY_UP_TO_100.includes(n));
		}
	});

	it("handles values at the 32-bit limit", () => {
		expect(happyNumber(2147483647)).toBe(false);
		expect(happyNumber(1000000000)).toBe(true);
	});
});
