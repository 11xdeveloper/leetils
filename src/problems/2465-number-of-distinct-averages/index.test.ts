import { describe, expect, it } from "bun:test";
import { numberOfDistinctAverages as distinctAverages } from ".";

describe("2465. Number of Distinct Averages", () => {
	it("solves the examples from the problem statement", () => {
		expect(distinctAverages([4, 1, 4, 0, 3, 5])).toBe(2);
		expect(distinctAverages([1, 100])).toBe(1);
	});
});
