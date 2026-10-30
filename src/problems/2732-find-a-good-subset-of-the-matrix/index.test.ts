import { describe, expect, it } from "bun:test";
import { findAGoodSubsetOfTheMatrix as goodSubsetofBinaryMatrix } from ".";

describe("2732. Find a Good Subset of the Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			goodSubsetofBinaryMatrix([
				[0, 1, 1, 0],
				[0, 0, 0, 1],
				[1, 1, 1, 1],
			]),
		).toEqual([0, 1]);
		expect(goodSubsetofBinaryMatrix([[0]])).toEqual([0]);
		expect(
			goodSubsetofBinaryMatrix([
				[1, 1, 1],
				[1, 1, 1],
			]),
		).toEqual([]);
	});
});
