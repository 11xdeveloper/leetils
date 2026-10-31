import { describe, expect, it } from "bun:test";
import { smallestAbsentPositiveGreaterThanAverage as smallestAbsent } from ".";

describe("3678. Smallest Absent Positive Greater Than Average", () => {
	it("solves the examples from the problem statement", () => {
		expect(smallestAbsent([3, 5])).toBe(6);
		expect(smallestAbsent([-1, 1, 2])).toBe(3);
		expect(smallestAbsent([4, -1])).toBe(2);
	});
});
