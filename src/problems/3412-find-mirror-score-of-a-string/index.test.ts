import { describe, expect, it } from "bun:test";
import { findMirrorScoreOfAString as calculateScore } from ".";

describe("3412. Find Mirror Score of a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(calculateScore("aczzx")).toBe(5);
		expect(calculateScore("abcdef")).toBe(0);
	});
});
