import { describe, expect, it } from "bun:test";
import { matchSubstringAfterReplacement as matchReplacement } from ".";

describe("2301. Match Substring After Replacement", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			matchReplacement("fool3e7bar", "leet", [
				["e", "3"],
				["t", "7"],
				["t", "8"],
			]),
		).toBeTrue();
		expect(matchReplacement("fooleetbar", "f00l", [["o", "0"]])).toBeFalse();
		expect(
			matchReplacement("Fool33tbaR", "leetd", [
				["e", "3"],
				["t", "7"],
				["t", "8"],
				["d", "b"],
				["p", "b"],
			]),
		).toBeTrue();
	});
});
