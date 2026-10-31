import { describe, expect, it } from "bun:test";
import { identifyTheLargestOutlierInAnArray as getLargestOutlier } from ".";

describe("3371. Identify the Largest Outlier in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(getLargestOutlier([2, 3, 5, 10])).toBe(10);
		expect(getLargestOutlier([-2, -1, -3, -6, 4])).toBe(4);
		expect(getLargestOutlier([1, 1, 1, 1, 1, 5, 5])).toBe(5);
	});
});
