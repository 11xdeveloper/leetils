import { describe, expect, it } from "bun:test";
import { relocateMarbles } from ".";

describe("2766. Relocate Marbles", () => {
	it("solves the examples from the problem statement", () => {
		expect(relocateMarbles([1, 6, 7, 8], [1, 7, 2], [2, 9, 5])).toEqual([
			5, 6, 8, 9,
		]);
		expect(relocateMarbles([1, 1, 3, 3], [1, 3], [2, 2])).toEqual([2]);
	});
});
