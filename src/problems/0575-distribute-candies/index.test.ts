import { describe, expect, it } from "bun:test";
import { distributeCandies } from ".";

describe("575. Distribute Candies", () => {
	it("solves the examples from the problem statement", () => {
		expect(distributeCandies([1, 1, 2, 2, 3, 3])).toBe(3);
		expect(distributeCandies([1, 1, 2, 3])).toBe(2);
		expect(distributeCandies([6, 6, 6, 6])).toBe(1);
	});
});
