import { describe, expect, it } from "bun:test";
import { minimumDeletionsToMakeArrayBeautiful as minDeletion } from ".";

describe("2216. Minimum Deletions to Make Array Beautiful", () => {
	it("solves the examples from the problem statement", () => {
		expect(minDeletion([1, 1, 2, 3, 5])).toBe(1);
		expect(minDeletion([1, 1, 2, 2, 3, 3])).toBe(2);
	});

	it("deletes everything when all values match", () => {
		expect(minDeletion([4, 4, 4])).toBe(3);
	});
});
