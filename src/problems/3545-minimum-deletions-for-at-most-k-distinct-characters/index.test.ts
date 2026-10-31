import { describe, expect, it } from "bun:test";
import { minimumDeletionsForAtMostKDistinctCharacters as minDeletion } from ".";

describe("3545. Minimum Deletions for At Most K Distinct Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDeletion("abc", 2)).toBe(1);
		expect(minDeletion("aabb", 2)).toBe(0);
		expect(minDeletion("yyyzz", 1)).toBe(2);
	});
});
