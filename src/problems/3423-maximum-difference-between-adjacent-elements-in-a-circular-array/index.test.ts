import { describe, expect, it } from "bun:test";
import { maximumDifferenceBetweenAdjacentElementsInACircularArray as maxAdjacentDistance } from ".";

describe("3423. Maximum Difference Between Adjacent Elements in a Circular Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxAdjacentDistance([1, 2, 4])).toBe(3);
		expect(maxAdjacentDistance([-5, -10, -5])).toBe(5);
	});
});
