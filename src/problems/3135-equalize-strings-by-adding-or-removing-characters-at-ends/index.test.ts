import { describe, expect, it } from "bun:test";
import { equalizeStringsByAddingOrRemovingCharactersAtEnds as minOperations } from ".";

describe("3135. Equalize Strings by Adding or Removing Characters at Ends", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations("abcde", "cdef")).toBe(3);
		expect(minOperations("axxy", "yabx")).toBe(6);
		expect(minOperations("xyz", "xyz")).toBe(0);
	});
});
