import { describe, expect, it } from "bun:test";
import { minimumTimeToRepairCars as repairCars } from ".";

describe("2594. Minimum Time to Repair Cars", () => {
	it("solves the examples from the problem statement", () => {
		expect(repairCars([4, 2, 3, 1], 10)).toBe(16);
		expect(repairCars([5, 1, 8], 6)).toBe(16);
	});
});
