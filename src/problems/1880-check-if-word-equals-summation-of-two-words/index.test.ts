import { describe, expect, it } from "bun:test";
import { checkIfWordEqualsSummationOfTwoWords as isSumEqual } from ".";

describe("1880. Check if Word Equals Summation of Two Words", () => {
	it("solves the examples from the problem statement", () => {
		expect(isSumEqual("acb", "cba", "cdb")).toBeTrue();
		expect(isSumEqual("aaa", "a", "aab")).toBeFalse();
		expect(isSumEqual("aaa", "a", "aaaa")).toBeTrue();
	});
});
