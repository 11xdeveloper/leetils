import { describe, expect, it } from "bun:test";
import { minimumEdgeTogglesOnATree as minimumFlips } from ".";

describe("3812. Minimum Edge Toggles on a Tree", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumFlips(
				3,
				[
					[0, 1],
					[1, 2],
				],
				"010",
				"100",
			),
		).toEqual([0]);
		expect(
			minimumFlips(
				7,
				[
					[0, 1],
					[1, 2],
					[2, 3],
					[3, 4],
					[3, 5],
					[1, 6],
				],
				"0011000",
				"0010001",
			),
		).toEqual([1, 2, 5]);
		expect(minimumFlips(2, [[0, 1]], "00", "01")).toEqual([-1]);
	});
});
