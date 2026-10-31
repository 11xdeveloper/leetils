import { describe, expect, it } from "bun:test";
import { equalScoreSubstrings as scoreBalance } from ".";

describe("3707. Equal Score Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(scoreBalance("adcb")).toBeTrue();
		expect(scoreBalance("bace")).toBeFalse();
	});
});
