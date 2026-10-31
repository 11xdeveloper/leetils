import { describe, expect, it } from "bun:test";
import { capitalizeTheTitle } from ".";

describe("2129. Capitalize the Title", () => {
	it("solves the examples from the problem statement", () => {
		expect(capitalizeTheTitle("capiTalIze tHe titLe")).toBe(
			"Capitalize The Title",
		);
		expect(capitalizeTheTitle("First leTTeR of EACH Word")).toBe(
			"First Letter of Each Word",
		);
		expect(capitalizeTheTitle("i lOve leetcode")).toBe("i Love Leetcode");
	});
});
