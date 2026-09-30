import { describe, expect, it } from "bun:test";
import { stringMatchingInAnArray as stringMatching } from ".";

describe("1408. String Matching in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(stringMatching(["mass", "as", "hero", "superhero"]).sort()).toEqual([
			"as",
			"hero",
		]);
		expect(stringMatching(["leetcode", "et", "code"]).sort()).toEqual([
			"code",
			"et",
		]);
		expect(stringMatching(["blue", "green", "bu"])).toEqual([]);
	});

	it("finds words nested several levels deep", () => {
		expect(stringMatching(["a", "ab", "abc"]).sort()).toEqual(["a", "ab"]);
	});
});
