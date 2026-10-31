import { describe, expect, it } from "bun:test";
import { minimumStringLengthAfterRemovingSubstrings as minLength } from ".";

describe("2696. Minimum String Length After Removing Substrings", () => {
	it("solves the examples from the problem statement", () => {
		expect(minLength("ABFCACDB")).toBe(2);
		expect(minLength("ACBBD")).toBe(5);
	});
});
