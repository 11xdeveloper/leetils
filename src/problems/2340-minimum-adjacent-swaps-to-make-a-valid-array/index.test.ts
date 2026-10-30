import { describe, expect, it } from "bun:test";
import { minimumAdjacentSwapsToMakeAValidArray as minimumSwaps } from ".";

describe("2340. Minimum Adjacent Swaps to Make a Valid Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSwaps([3, 4, 5, 5, 3, 1])).toBe(6);
		expect(minimumSwaps([9])).toBe(0);
	});

	it("saves a swap when the extremes cross", () => {
		expect(minimumSwaps([2, 1])).toBe(1);
	});
});
