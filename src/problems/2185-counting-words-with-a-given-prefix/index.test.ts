import { describe, expect, it } from "bun:test";
import { countingWordsWithAGivenPrefix as prefixCount } from ".";

describe("2185. Counting Words With a Given Prefix", () => {
	it("solves the examples from the problem statement", () => {
		expect(prefixCount(["pay", "attention", "practice", "attend"], "at")).toBe(
			2,
		);
		expect(prefixCount(["leetcode", "win", "loops", "success"], "code")).toBe(
			0,
		);
	});
});
