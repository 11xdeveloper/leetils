import { describe, expect, it } from "bun:test";
import { numberOfUnequalTripletsInArray as unequalTriplets } from ".";

describe("2475. Number of Unequal Triplets in Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(unequalTriplets([4, 4, 2, 4, 3])).toBe(3);
		expect(unequalTriplets([1, 1, 1, 1, 1])).toBe(0);
	});
});
