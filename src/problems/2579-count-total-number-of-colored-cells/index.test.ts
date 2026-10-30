import { describe, expect, it } from "bun:test";
import { countTotalNumberOfColoredCells as coloredCells } from ".";

describe("2579. Count Total Number of Colored Cells", () => {
	it("solves the examples from the problem statement", () => {
		expect(coloredCells(1)).toBe(1);
		expect(coloredCells(2)).toBe(5);
	});

	it("grows by a ring each minute", () => {
		expect(coloredCells(3)).toBe(13);
	});
});
