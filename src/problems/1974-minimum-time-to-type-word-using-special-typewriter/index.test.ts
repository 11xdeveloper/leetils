import { describe, expect, it } from "bun:test";
import { minimumTimeToTypeWordUsingSpecialTypewriter as minTimeToType } from ".";

describe("1974. Minimum Time to Type Word Using Special Typewriter", () => {
	it("solves the examples from the problem statement", () => {
		expect(minTimeToType("abc")).toBe(5);
		expect(minTimeToType("bza")).toBe(7);
		expect(minTimeToType("zjpc")).toBe(34);
	});
});
