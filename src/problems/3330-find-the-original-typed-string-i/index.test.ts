import { describe, expect, it } from "bun:test";
import { findTheOriginalTypedStringI as possibleStringCount } from ".";

describe("3330. Find the Original Typed String I", () => {
	it("solves the examples from the problem statement", () => {
		expect(possibleStringCount("abbcccc")).toBe(5);
		expect(possibleStringCount("abcd")).toBe(1);
		expect(possibleStringCount("aaaa")).toBe(4);
	});
});
