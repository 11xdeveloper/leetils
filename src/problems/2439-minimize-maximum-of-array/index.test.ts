import { describe, expect, it } from "bun:test";
import { minimizeMaximumOfArray as minimizeArrayValue } from ".";

describe("2439. Minimize Maximum of Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimizeArrayValue([3, 7, 1, 6])).toBe(5);
		expect(minimizeArrayValue([10, 1])).toBe(10);
	});
});
