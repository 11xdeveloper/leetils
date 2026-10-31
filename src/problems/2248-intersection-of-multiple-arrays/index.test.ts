import { describe, expect, it } from "bun:test";
import { intersectionOfMultipleArrays as intersection } from ".";

describe("2248. Intersection of Multiple Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			intersection([
				[3, 1, 2, 4, 5],
				[1, 2, 3, 4],
				[3, 4, 5, 6],
			]),
		).toEqual([3, 4]);
		expect(
			intersection([
				[1, 2, 3],
				[4, 5, 6],
			]),
		).toEqual([]);
	});
});
