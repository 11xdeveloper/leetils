import { describe, expect, it } from "bun:test";
import { minimumLengthOfStringAfterOperations as minimumLength } from ".";

describe("3223. Minimum Length of String After Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumLength("abaacbcbb")).toBe(5);
		expect(minimumLength("aa")).toBe(2);
	});
});
