import { describe, expect, it } from "bun:test";
import { hashDividedString as stringHash } from ".";

describe("3271. Hash Divided String", () => {
	it("solves the examples from the problem statement", () => {
		expect(stringHash("abcd", 2)).toBe("bf");
		expect(stringHash("mxz", 3)).toBe("i");
	});
});
