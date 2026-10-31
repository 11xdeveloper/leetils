import { describe, expect, it } from "bun:test";
import { removingStarsFromAString as removeStars } from ".";

describe("2390. Removing Stars From a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeStars("leet**cod*e")).toBe("lecoe");
		expect(removeStars("erase*****")).toBe("");
	});
});
