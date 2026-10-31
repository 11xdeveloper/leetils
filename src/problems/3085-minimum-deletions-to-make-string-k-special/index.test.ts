import { describe, expect, it } from "bun:test";
import { minimumDeletionsToMakeStringKSpecial as minimumDeletions } from ".";

describe("3085. Minimum Deletions to Make String K-Special", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumDeletions("aabcaba", 0)).toBe(3);
		expect(minimumDeletions("dabdcbdcdcd", 2)).toBe(2);
		expect(minimumDeletions("aaabaaa", 2)).toBe(1);
	});
});
