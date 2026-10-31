import { describe, expect, it } from "bun:test";
import { countHillsAndValleysInAnArray as countHillValley } from ".";

describe("2210. Count Hills and Valleys in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(countHillValley([2, 4, 1, 1, 6, 5])).toBe(3);
		expect(countHillValley([6, 6, 5, 5, 4, 1])).toBe(0);
	});
});
