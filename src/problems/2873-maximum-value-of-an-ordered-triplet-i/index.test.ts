import { describe, expect, it } from "bun:test";
import { maximumValueOfAnOrderedTripletI as maximumTripletValue } from ".";

describe("2873. Maximum Value of an Ordered Triplet I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumTripletValue([12, 6, 1, 2, 7])).toBe(77);
		expect(maximumTripletValue([1, 10, 3, 4, 19])).toBe(133);
		expect(maximumTripletValue([1, 2, 3])).toBe(0);
	});
});
