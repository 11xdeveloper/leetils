import { describe, expect, it } from "bun:test";
import { doubleModularExponentiation as getGoodIndices } from ".";

describe("2961. Double Modular Exponentiation", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			getGoodIndices(
				[
					[2, 3, 3, 10],
					[3, 3, 3, 1],
					[6, 1, 1, 4],
				],
				2,
			),
		).toEqual([0, 2]);
		expect(getGoodIndices([[39, 3, 1000, 1000]], 17)).toEqual([]);
	});
});
