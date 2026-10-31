import { describe, expect, it } from "bun:test";
import { unitConversionI as baseUnitConversions } from ".";

describe("3528. Unit Conversion I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			baseUnitConversions([
				[0, 1, 2],
				[1, 2, 3],
			]),
		).toEqual([1, 2, 6]);
		expect(
			baseUnitConversions([
				[0, 1, 2],
				[0, 2, 3],
				[1, 3, 4],
				[1, 4, 5],
				[2, 5, 2],
				[4, 6, 3],
				[5, 7, 4],
			]),
		).toEqual([1, 2, 3, 8, 10, 6, 30, 24]);
	});
});
