import { describe, expect, it } from "bun:test";
import { minimizeStringLength as minimizedStringLength } from ".";

describe("2716. Minimize String Length", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimizedStringLength("aaabc")).toBe(3);
		expect(minimizedStringLength("cbbd")).toBe(3);
		expect(minimizedStringLength("dddaaa")).toBe(2);
	});
});
