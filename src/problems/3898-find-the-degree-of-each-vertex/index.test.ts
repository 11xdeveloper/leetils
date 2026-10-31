import { describe, expect, it } from "bun:test";
import { findTheDegreeOfEachVertex as findDegrees } from ".";

describe("3898. Find the Degree of Each Vertex", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findDegrees([
				[0, 1, 1],
				[1, 0, 1],
				[1, 1, 0],
			]),
		).toEqual([2, 2, 2]);
		expect(
			findDegrees([
				[0, 1, 0],
				[1, 0, 0],
				[0, 0, 0],
			]),
		).toEqual([1, 1, 0]);
		expect(findDegrees([[0]])).toEqual([0]);
	});
});
