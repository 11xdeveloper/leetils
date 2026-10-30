import { describe, expect, it } from "bun:test";
import { lastVisitedIntegers } from ".";

describe("2899. Last Visited Integers", () => {
	it("solves the examples from the problem statement", () => {
		expect(lastVisitedIntegers([1, 2, -1, -1, -1])).toEqual([2, 1, -1]);
		expect(lastVisitedIntegers([1, -1, 2, -1, -1])).toEqual([1, 2, 1]);
	});
});
