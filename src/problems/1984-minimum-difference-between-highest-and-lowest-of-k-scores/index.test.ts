import { describe, expect, it } from "bun:test";
import { minimumDifferenceBetweenHighestAndLowestOfKScores as minimumDifference } from ".";

describe("1984. Minimum Difference Between Highest and Lowest of K Scores", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumDifference([90], 1)).toBe(0);
		expect(minimumDifference([9, 4, 1, 7], 2)).toBe(2);
	});
});
