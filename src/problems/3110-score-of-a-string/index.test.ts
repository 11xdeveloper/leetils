import { describe, expect, it } from "bun:test";
import { scoreOfAString } from ".";

describe("3110. Score of a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(scoreOfAString("hello")).toBe(13);
		expect(scoreOfAString("zaz")).toBe(50);
	});
});
