import { describe, expect, it } from "bun:test";
import { findTheStudentThatWillReplaceTheChalk as chalkReplacer } from ".";

describe("1894. Find the Student that Will Replace the Chalk", () => {
	it("solves the examples from the problem statement", () => {
		expect(chalkReplacer([5, 1, 5], 22)).toBe(0);
		expect(chalkReplacer([3, 4, 1, 2], 25)).toBe(1);
	});
});
