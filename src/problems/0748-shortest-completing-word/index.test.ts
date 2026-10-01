import { describe, expect, it } from "bun:test";
import { shortestCompletingWord } from ".";

describe("748. Shortest Completing Word", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			shortestCompletingWord("1s3 PSt", ["step", "steps", "stripe", "stepple"]),
		).toBe("steps");
		expect(
			shortestCompletingWord("1s3 456", ["looks", "pest", "stew", "show"]),
		).toBe("pest");
	});

	it("keeps the first of equally short words", () => {
		expect(shortestCompletingWord("aB", ["cab", "bad", "ab"])).toBe("ab");
		expect(shortestCompletingWord("aB", ["cab", "bad"])).toBe("cab");
	});
});
