import { describe, expect, it } from "bun:test";
import { numberOfArithmeticTriplets as arithmeticTriplets } from ".";

describe("2367. Number of Arithmetic Triplets", () => {
	it("solves the examples from the problem statement", () => {
		expect(arithmeticTriplets([0, 1, 4, 6, 7, 10], 3)).toBe(2);
		expect(arithmeticTriplets([4, 5, 6, 7, 8, 9], 2)).toBe(2);
	});
});
