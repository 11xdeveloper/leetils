import { describe, expect, it } from "bun:test";
import { mergeStringsAlternately as mergeAlternately } from ".";

describe("1768. Merge Strings Alternately", () => {
	it("solves the examples from the problem statement", () => {
		expect(mergeAlternately("abc", "pqr")).toBe("apbqcr");
		expect(mergeAlternately("ab", "pqrs")).toBe("apbqrs");
		expect(mergeAlternately("abcd", "pq")).toBe("apbqcd");
	});
});
