import { describe, expect, it } from "bun:test";
import { maximumCountOfPositiveIntegerAndNegativeInteger as maximumCount } from ".";

describe("2529. Maximum Count of Positive Integer and Negative Integer", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumCount([-2, -1, -1, 1, 2, 3])).toBe(3);
		expect(maximumCount([-3, -2, -1, 0, 0, 1, 2])).toBe(3);
		expect(maximumCount([5, 20, 66, 1314])).toBe(4);
	});
});
