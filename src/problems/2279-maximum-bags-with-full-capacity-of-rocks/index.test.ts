import { describe, expect, it } from "bun:test";
import { maximumBagsWithFullCapacityOfRocks as maximumBags } from ".";

describe("2279. Maximum Bags With Full Capacity of Rocks", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumBags([2, 3, 4, 5], [1, 2, 4, 4], 2)).toBe(3);
		expect(maximumBags([10, 2, 2], [2, 2, 0], 100)).toBe(3);
	});
});
