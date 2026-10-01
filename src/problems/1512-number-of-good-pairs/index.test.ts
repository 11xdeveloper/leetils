import { describe, expect, it } from "bun:test";
import { numberOfGoodPairs as numIdenticalPairs } from ".";

describe("1512. Number of Good Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(numIdenticalPairs([1, 2, 3, 1, 1, 3])).toBe(4);
		expect(numIdenticalPairs([1, 1, 1, 1])).toBe(6);
		expect(numIdenticalPairs([1, 2, 3])).toBe(0);
	});
});
