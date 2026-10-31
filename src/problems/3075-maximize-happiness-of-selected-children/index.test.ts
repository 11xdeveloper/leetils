import { describe, expect, it } from "bun:test";
import { maximizeHappinessOfSelectedChildren as maximumHappinessSum } from ".";

describe("3075. Maximize Happiness of Selected Children", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumHappinessSum([1, 2, 3], 2)).toBe(4);
		expect(maximumHappinessSum([1, 1, 1, 1], 2)).toBe(1);
		expect(maximumHappinessSum([2, 3, 4, 5], 1)).toBe(5);
	});
});
