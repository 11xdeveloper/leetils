import { describe, expect, it } from "bun:test";
import { findTheEncryptedString as getEncryptedString } from ".";

describe("3210. Find the Encrypted String", () => {
	it("solves the examples from the problem statement", () => {
		expect(getEncryptedString("dart", 3)).toBe("tdar");
		expect(getEncryptedString("aaa", 1)).toBe("aaa");
	});
});
