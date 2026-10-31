import { describe, expect, it } from "bun:test";
import { numberOfAdjacentElementsWithTheSameColor as colorTheArray } from ".";

describe("2672. Number of Adjacent Elements With the Same Color", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			colorTheArray(4, [
				[0, 2],
				[1, 2],
				[3, 1],
				[1, 1],
				[2, 1],
			]),
		).toEqual([0, 1, 1, 0, 2]);
		expect(colorTheArray(1, [[0, 100000]])).toEqual([0]);
	});
});
