import { describe, expect, it } from "bun:test";
import { occurrencesAfterBigram as findOcurrences } from ".";

describe("1078. Occurrences After Bigram", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findOcurrences("alice is a good girl she is a good student", "a", "good"),
		).toEqual(["girl", "student"]);
		expect(findOcurrences("we will we will rock you", "we", "will")).toEqual([
			"we",
			"rock",
		]);
	});
});
