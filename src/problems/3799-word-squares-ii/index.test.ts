import { describe, expect, it } from "bun:test";
import { wordSquaresII as wordSquares } from ".";

describe("3799. Word Squares II", () => {
	it("solves the examples from the problem statement", () => {
		expect(wordSquares(["able", "area", "echo", "also"])).toEqual([
			["able", "area", "echo", "also"],
			["area", "able", "also", "echo"],
		]);
		expect(wordSquares(["code", "cafe", "eden", "edge"])).toEqual([]);
	});
});
