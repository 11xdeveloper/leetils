import { describe, expect, it } from "bun:test";
import { specialArrayII as isArraySpecial } from ".";

describe("3152. Special Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(isArraySpecial([3, 4, 1, 2, 6], [[0, 4]])).toEqual([false]);
		expect(
			isArraySpecial(
				[4, 3, 1, 6],
				[
					[0, 2],
					[2, 3],
				],
			),
		).toEqual([false, true]);
	});
});
