import { describe, expect, it } from "bun:test";
import { findTheDivisibilityArrayOfAString as divisibilityArray } from ".";

describe("2575. Find the Divisibility Array of a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(divisibilityArray("998244353", 3)).toEqual([
			1, 1, 0, 0, 0, 1, 1, 0, 0,
		]);
		expect(divisibilityArray("1010", 10)).toEqual([0, 1, 0, 1]);
	});
});
