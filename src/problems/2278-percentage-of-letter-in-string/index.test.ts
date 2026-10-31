import { describe, expect, it } from "bun:test";
import { percentageOfLetterInString as percentageLetter } from ".";

describe("2278. Percentage of Letter in String", () => {
	it("solves the examples from the problem statement", () => {
		expect(percentageLetter("foobar", "o")).toBe(33);
		expect(percentageLetter("jjjj", "k")).toBe(0);
	});
});
