import { describe, expect, it } from "bun:test";
import { findValidPairOfAdjacentDigitsInString as findValidPair } from ".";

describe("3438. Find Valid Pair of Adjacent Digits in String", () => {
	it("solves the examples from the problem statement", () => {
		expect(findValidPair("2523533")).toBe("23");
		expect(findValidPair("221")).toBe("21");
		expect(findValidPair("22")).toBe("");
	});
});
