import { describe, expect, it } from "bun:test";
import { brightestPositionOnStreet as brightestPosition } from ".";

describe("2021. Brightest Position on Street", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			brightestPosition([
				[-3, 2],
				[1, 2],
				[3, 3],
			]),
		).toBe(-1);
		expect(
			brightestPosition([
				[1, 0],
				[0, 1],
			]),
		).toBe(1);
		expect(brightestPosition([[1, 2]])).toBe(-1);
	});

	it("counts lights that meet at a single point", () => {
		expect(
			brightestPosition([
				[0, 1],
				[2, 1],
			]),
		).toBe(1);
	});
});
