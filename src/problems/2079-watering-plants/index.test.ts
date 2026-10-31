import { describe, expect, it } from "bun:test";
import { wateringPlants } from ".";

describe("2079. Watering Plants", () => {
	it("solves the examples from the problem statement", () => {
		expect(wateringPlants([2, 2, 3, 3], 5)).toBe(14);
		expect(wateringPlants([1, 1, 1, 4, 2, 3], 4)).toBe(30);
		expect(wateringPlants([7, 7, 7, 7, 7, 7, 7], 8)).toBe(49);
	});
});
