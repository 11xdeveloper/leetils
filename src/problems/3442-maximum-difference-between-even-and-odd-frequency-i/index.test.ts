import { describe, expect, it } from "bun:test";
import { maximumDifferenceBetweenEvenAndOddFrequencyI as maxDifference } from ".";

describe("3442. Maximum Difference Between Even and Odd Frequency I", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDifference("aaaaabbc")).toBe(3);
		expect(maxDifference("abcabcab")).toBe(1);
	});
});
