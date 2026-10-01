import { describe, expect, it } from "bun:test";
import { concatenationOfArray as getConcatenation } from ".";

describe("1929. Concatenation of Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(getConcatenation([1, 2, 1])).toEqual([1, 2, 1, 1, 2, 1]);
		expect(getConcatenation([1, 3, 2, 1])).toEqual([1, 3, 2, 1, 1, 3, 2, 1]);
	});
});
