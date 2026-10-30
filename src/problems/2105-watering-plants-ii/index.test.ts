import { describe, expect, it } from "bun:test";
import { wateringPlantsII as minimumRefill } from ".";

describe("2105. Watering Plants II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumRefill([2, 2, 3, 3], 5, 5)).toBe(1);
		expect(minimumRefill([2, 2, 3, 3], 3, 4)).toBe(2);
		expect(minimumRefill([5], 10, 8)).toBe(0);
	});

	it("refills for a shared middle plant only if both lack water", () => {
		expect(minimumRefill([1, 5, 1], 3, 6)).toBe(0);
		expect(minimumRefill([2, 5, 2], 5, 5)).toBe(1);
	});
});
