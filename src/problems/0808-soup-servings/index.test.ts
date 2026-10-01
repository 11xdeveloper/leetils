import { describe, expect, it } from "bun:test";
import { soupServings } from ".";

describe("808. Soup Servings", () => {
	it("solves the examples from the problem statement", () => {
		expect(soupServings(50)).toBeCloseTo(0.625, 10);
		expect(soupServings(100)).toBeCloseTo(0.71875, 10);
	});

	it("treats 0 ml as running out together", () => {
		expect(soupServings(0)).toBe(0.5);
	});

	it("approaches 1 for large amounts, within the allowed error", () => {
		expect(Math.abs(soupServings(4800) - 1)).toBeLessThan(1e-5);
		expect(soupServings(10 ** 9)).toBe(1);
	});
});
