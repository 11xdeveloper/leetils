import { describe, expect, it } from "bun:test";
import { validWord as isValid } from ".";

describe("3136. Valid Word", () => {
	it("solves the examples from the problem statement", () => {
		expect(isValid("234Adas")).toBeTrue();
		expect(isValid("b3")).toBeFalse();
		expect(isValid("a3$e")).toBeFalse();
	});

	it("needs a consonant", () => {
		expect(isValid("aei1")).toBeFalse();
		expect(isValid("Ya1")).toBeTrue();
	});
});
