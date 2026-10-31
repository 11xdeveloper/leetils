import { describe, expect, it } from "bun:test";
import { passwordStrength } from ".";

describe("3941. Password Strength", () => {
	it("solves the examples from the problem statement", () => {
		expect(passwordStrength("aA1!")).toBe(11);
		expect(passwordStrength("bbB11#")).toBe(11);
	});
});
