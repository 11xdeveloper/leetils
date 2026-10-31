import { describe, expect, it } from "bun:test";
import { findTheCountOfNumbersWhichAreNotSpecial as nonSpecialCount } from ".";

describe("3233. Find the Count of Numbers Which Are Not Special", () => {
	it("solves the examples from the problem statement", () => {
		expect(nonSpecialCount(5, 7)).toBe(3);
		expect(nonSpecialCount(4, 16)).toBe(11);
	});

	it("matches counting proper divisors", () => {
		const special = (x: number) => {
			let divisors = 0;
			for (let d = 1; d < x; d++) if (x % d === 0) divisors++;
			return divisors === 2;
		};
		for (let l = 1; l <= 60; l += 7)
			for (let r = l; r <= 200; r += 13) {
				let count = 0;
				for (let x = l; x <= r; x++) if (!special(x)) count++;
				expect(nonSpecialCount(l, r)).toBe(count);
			}
	});
});
