import { describe, expect, it } from "bun:test";
import { sortBy } from ".";

describe("2724. Sort By", () => {
	it("solves the examples from the problem statement", () => {
		expect(sortBy([5, 4, 1, 2, 3], (x) => x)).toEqual([1, 2, 3, 4, 5]);
		expect(sortBy([{ x: 1 }, { x: 0 }, { x: -1 }], (d) => d.x)).toEqual([
			{ x: -1 },
			{ x: 0 },
			{ x: 1 },
		]);
		expect(
			sortBy(
				[
					[3, 4],
					[5, 2],
					[10, 1],
				],
				(x) => x[1] ?? 0,
			),
		).toEqual([
			[10, 1],
			[5, 2],
			[3, 4],
		]);
	});
});
