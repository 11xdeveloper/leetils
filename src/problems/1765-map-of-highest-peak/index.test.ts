import { describe, expect, it } from "bun:test";
import { mapOfHighestPeak as highestPeak } from ".";

describe("1765. Map of Highest Peak", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			highestPeak([
				[0, 1],
				[0, 0],
			]),
		).toEqual([
			[1, 0],
			[2, 1],
		]);
		expect(
			highestPeak([
				[0, 0, 1],
				[1, 0, 0],
				[0, 0, 0],
			]),
		).toEqual([
			[1, 1, 0],
			[0, 1, 1],
			[1, 2, 2],
		]);
	});
});
