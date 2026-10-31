import { describe, expect, it } from "bun:test";
import { joinTwoArraysById } from ".";

describe("2722. Join Two Arrays by ID", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			joinTwoArraysById(
				[
					{ id: 1, x: 1 },
					{ id: 2, x: 9 },
				],
				[{ id: 3, x: 5 }],
			),
		).toEqual([
			{ id: 1, x: 1 },
			{ id: 2, x: 9 },
			{ id: 3, x: 5 },
		]);
		expect(
			joinTwoArraysById(
				[
					{ id: 1, x: 2, y: 3 },
					{ id: 2, x: 3, y: 6 },
				],
				[
					{ id: 2, x: 10, y: 20 },
					{ id: 3, x: 0, y: 0 },
				],
			),
		).toEqual([
			{ id: 1, x: 2, y: 3 },
			{ id: 2, x: 10, y: 20 },
			{ id: 3, x: 0, y: 0 },
		]);
		expect(
			joinTwoArraysById(
				[{ id: 1, b: { b: 94 }, v: [4, 3], y: 48 }],
				[{ id: 1, b: { c: 84 }, v: [1, 3] }],
			),
		).toEqual([{ id: 1, b: { c: 84 }, v: [1, 3], y: 48 }]);
	});
});
