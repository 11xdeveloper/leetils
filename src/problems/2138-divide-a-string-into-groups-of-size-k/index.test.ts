import { describe, expect, it } from "bun:test";
import { divideAStringIntoGroupsOfSizeK as divideString } from ".";

describe("2138. Divide a String Into Groups of Size k", () => {
	it("solves the examples from the problem statement", () => {
		expect(divideString("abcdefghi", 3, "x")).toEqual(["abc", "def", "ghi"]);
		expect(divideString("abcdefghij", 3, "x")).toEqual([
			"abc",
			"def",
			"ghi",
			"jxx",
		]);
	});
});
