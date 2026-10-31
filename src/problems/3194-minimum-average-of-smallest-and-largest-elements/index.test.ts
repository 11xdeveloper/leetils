import { describe, expect, it } from "bun:test";
import { minimumAverageOfSmallestAndLargestElements as minimumAverage } from ".";

describe("3194. Minimum Average of Smallest and Largest Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumAverage([7, 8, 3, 4, 15, 13, 4, 1])).toBe(5.5);
		expect(minimumAverage([1, 9, 8, 3, 10, 5])).toBe(5.5);
		expect(minimumAverage([1, 2, 3, 7, 8, 9])).toBe(5);
	});
});
