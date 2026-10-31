import { describe, expect, it } from "bun:test";
import { modifyTheMatrix } from ".";

describe("3033. Modify the Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			modifyTheMatrix([
				[1, 2, -1],
				[4, -1, 6],
				[7, 8, 9],
			]),
		).toEqual([
			[1, 2, 9],
			[4, 8, 6],
			[7, 8, 9],
		]);
		expect(
			modifyTheMatrix([
				[3, -1],
				[5, 2],
			]),
		).toEqual([
			[3, 2],
			[5, 2],
		]);
	});
});
