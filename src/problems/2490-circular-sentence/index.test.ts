import { describe, expect, it } from "bun:test";
import { circularSentence as isCircularSentence } from ".";

describe("2490. Circular Sentence", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isCircularSentence("leetcode exercises sound delightful"),
		).toBeTrue();
		expect(isCircularSentence("eetcode")).toBeTrue();
		expect(isCircularSentence("Leetcode is cool")).toBeFalse();
	});
});
