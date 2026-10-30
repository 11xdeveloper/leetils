import { describe, expect, it } from "bun:test";
import { shortestDistanceToTargetStringInACircularArray as closestTarget } from ".";

describe("2515. Shortest Distance to Target String in a Circular Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			closestTarget(["hello", "i", "am", "leetcode", "hello"], "hello", 1),
		).toBe(1);
		expect(closestTarget(["a", "b", "leetcode"], "leetcode", 0)).toBe(1);
		expect(closestTarget(["i", "eat", "leetcode"], "ate", 0)).toBe(-1);
	});
});
