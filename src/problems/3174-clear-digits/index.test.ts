import { describe, expect, it } from "bun:test";
import { clearDigits } from ".";

describe("3174. Clear Digits", () => {
	it("solves the examples from the problem statement", () => {
		expect(clearDigits("abc")).toBe("abc");
		expect(clearDigits("cb34")).toBe("");
		expect(clearDigits("a1b2c")).toBe("c");
	});
});
