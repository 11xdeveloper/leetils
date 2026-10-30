import { describe, expect, it } from "bun:test";
import { smallestValueOfTheRearrangedNumber as smallestNumber } from ".";

describe("2165. Smallest Value of the Rearranged Number", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestNumber(310)).toBe(103);
		expect(smallestNumber(-7605)).toBe(-7650);
	});

	it("handles zero and large values", () => {
		expect(smallestNumber(0)).toBe(0);
		expect(smallestNumber(1_000_000_000_000_000)).toBe(1_000_000_000_000_000);
		expect(smallestNumber(-1_000_000_000_000_000)).toBe(-1_000_000_000_000_000);
	});
});
