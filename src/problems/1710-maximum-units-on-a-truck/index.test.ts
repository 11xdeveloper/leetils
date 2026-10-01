import { describe, expect, it } from "bun:test";
import { maximumUnitsOnATruck as maximumUnits } from ".";

describe("1710. Maximum Units on a Truck", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumUnits(
				[
					[1, 3],
					[2, 2],
					[3, 1],
				],
				4,
			),
		).toBe(8);
		expect(
			maximumUnits(
				[
					[5, 10],
					[2, 5],
					[4, 7],
					[3, 9],
				],
				10,
			),
		).toBe(91);
	});
});
