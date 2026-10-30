import { describe, expect, it } from "bun:test";
import { minimizeMaximumValueInAGrid as minScore } from ".";

describe("2371. Minimize Maximum Value in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minScore([
				[3, 1],
				[2, 5],
			]),
		).toEqual([
			[2, 1],
			[1, 2],
		]);
		expect(minScore([[10]])).toEqual([[1]]);
	});
});
