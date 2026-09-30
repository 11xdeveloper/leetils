import { describe, expect, it } from "bun:test";
import { champagneTower } from ".";

describe("799. Champagne Tower", () => {
	it("solves the examples from the problem statement", () => {
		expect(champagneTower(1, 1, 1)).toBe(0);
		expect(champagneTower(2, 1, 1)).toBe(0.5);
		expect(champagneTower(100000009, 33, 17)).toBe(1);
	});

	it("fills the third row's middle glass twice as fast as its sides", () => {
		// 4 cups: the top keeps 1, row 1 gets 1.5 each, keeping 1 and passing 0.25 each way.
		expect(champagneTower(4, 2, 0)).toBe(0.25);
		expect(champagneTower(4, 2, 1)).toBe(0.5);
		expect(champagneTower(4, 2, 2)).toBe(0.25);
	});
});
