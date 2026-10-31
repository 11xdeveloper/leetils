import { describe, expect, it } from "bun:test";
import { numberOfDivisibleTripletSums as divisibleTripletCount } from ".";

describe("2964. Number of Divisible Triplet Sums", () => {
	it("solves the examples from the problem statement", () => {
		expect(divisibleTripletCount([3, 3, 4, 7, 8], 5)).toBe(3);
		expect(divisibleTripletCount([3, 3, 3, 3], 3)).toBe(4);
		expect(divisibleTripletCount([3, 3, 3, 3], 6)).toBe(0);
	});
});
