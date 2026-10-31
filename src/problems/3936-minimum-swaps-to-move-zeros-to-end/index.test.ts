import { describe, expect, it } from "bun:test";
import { minimumSwapsToMoveZerosToEnd as minimumSwaps } from ".";

describe("3936. Minimum Swaps to Move Zeros to End", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSwaps([0, 1, 0, 3, 12])).toBe(2);
		expect(minimumSwaps([0, 1, 0, 2])).toBe(1);
		expect(minimumSwaps([1, 2, 0])).toBe(0);
	});
});
