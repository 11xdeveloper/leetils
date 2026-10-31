import { describe, expect, it } from "bun:test";
import { generateTagForVideoCaption as generateTag } from ".";

describe("3582. Generate Tag for Video Caption", () => {
	it("solves the examples from the problem statement", () => {
		expect(generateTag("Leetcode daily streak achieved")).toBe(
			"#leetcodeDailyStreakAchieved",
		);
		expect(generateTag("can I Go There")).toBe("#canIGoThere");
		expect(generateTag("h".repeat(150))).toBe(`#${"h".repeat(99)}`);
	});

	it("ignores extra spaces", () => {
		expect(generateTag("  hello   WORLD ")).toBe("#helloWorld");
	});
});
