import { describe, expect, it } from "bun:test";
import { carFleet } from ".";

describe("853. Car Fleet", () => {
	it("solves the examples from the problem statement", () => {
		expect(carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3])).toBe(3);
		expect(carFleet(10, [3], [3])).toBe(1);
		expect(carFleet(100, [0, 2, 4], [4, 2, 1])).toBe(1);
	});

	it("keeps cars that catch up exactly at the target in one fleet", () => {
		expect(carFleet(10, [0, 5], [2, 1])).toBe(1);
		expect(carFleet(10, [0, 5], [1, 1])).toBe(2);
	});
});
