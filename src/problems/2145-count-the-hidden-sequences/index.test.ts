import { describe, expect, it } from "bun:test";
import { countTheHiddenSequences as numberOfArrays } from ".";

describe("2145. Count the Hidden Sequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfArrays([1, -3, 4], 1, 6)).toBe(2);
		expect(numberOfArrays([3, -4, 5, 1, -2], -4, 5)).toBe(4);
		expect(numberOfArrays([4, -7, 2], 3, 6)).toBe(0);
	});
});
