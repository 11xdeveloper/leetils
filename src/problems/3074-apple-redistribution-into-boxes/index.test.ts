import { describe, expect, it } from "bun:test";
import { appleRedistributionIntoBoxes as minimumBoxes } from ".";

describe("3074. Apple Redistribution into Boxes", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumBoxes([1, 3, 2], [4, 3, 1, 5, 2])).toBe(2);
		expect(minimumBoxes([5, 5, 5], [2, 4, 2, 7])).toBe(4);
	});
});
