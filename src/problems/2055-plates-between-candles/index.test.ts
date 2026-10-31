import { describe, expect, it } from "bun:test";
import { platesBetweenCandles } from ".";

describe("2055. Plates Between Candles", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			platesBetweenCandles("**|**|***|", [
				[2, 5],
				[5, 9],
			]),
		).toEqual([2, 3]);
		expect(
			platesBetweenCandles("***|**|*****|**||**|*", [
				[1, 17],
				[4, 5],
				[14, 17],
				[5, 11],
				[15, 16],
			]),
		).toEqual([9, 0, 0, 0, 0]);
	});

	it("handles strings without candles", () => {
		expect(platesBetweenCandles("***", [[0, 2]])).toEqual([0]);
	});
});
