import { describe, expect, it } from "bun:test";
import { minimumRightShiftsToSortTheArray as minimumRightShifts } from ".";

describe("2855. Minimum Right Shifts to Sort the Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumRightShifts([3, 4, 5, 1, 2])).toBe(2);
		expect(minimumRightShifts([1, 3, 5])).toBe(0);
		expect(minimumRightShifts([2, 1, 4])).toBe(-1);
	});

	it("handles a single element", () => {
		expect(minimumRightShifts([7])).toBe(0);
	});
});
