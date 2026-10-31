import { describe, expect, it } from "bun:test";
import { countTheNumberOfIncremovableSubarraysI as incremovableSubarrayCount } from ".";

describe("2970. Count the Number of Incremovable Subarrays I", () => {
	it("solves the examples from the problem statement", () => {
		expect(incremovableSubarrayCount([1, 2, 3, 4])).toBe(10);
		expect(incremovableSubarrayCount([6, 5, 7, 8])).toBe(7);
		expect(incremovableSubarrayCount([8, 7, 6, 6])).toBe(3);
	});
});
