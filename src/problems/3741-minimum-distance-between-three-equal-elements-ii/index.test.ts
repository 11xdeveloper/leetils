import { describe, expect, it } from "bun:test";
import { minimumDistanceBetweenThreeEqualElementsII as minimumDistance } from ".";

describe("3741. Minimum Distance Between Three Equal Elements II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumDistance([1, 2, 1, 1, 3])).toBe(6);
		expect(minimumDistance([1, 1, 2, 3, 2, 1, 2])).toBe(8);
		expect(minimumDistance([1])).toBe(-1);
	});
});
