import { describe, expect, it } from "bun:test";
import { heightChecker } from ".";

describe("1051. Height Checker", () => {
	it("solves the examples from the problem statement", () => {
		expect(heightChecker([1, 1, 4, 2, 1, 3])).toBe(3);
		expect(heightChecker([5, 1, 2, 3, 4])).toBe(5);
		expect(heightChecker([1, 2, 3, 4, 5])).toBe(0);
	});
});
