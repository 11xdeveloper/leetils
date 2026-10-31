import { describe, expect, it } from "bun:test";
import { findTheMostCommonResponse as findCommonResponse } from ".";

describe("3527. Find the Most Common Response", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findCommonResponse([
				["good", "ok", "good", "ok"],
				["ok", "bad", "good", "ok", "ok"],
				["good"],
				["bad"],
			]),
		).toBe("good");
		expect(
			findCommonResponse([
				["good", "ok", "good"],
				["ok", "bad"],
				["bad", "notsure"],
				["great", "good"],
			]),
		).toBe("bad");
	});
});
