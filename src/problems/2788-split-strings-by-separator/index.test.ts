import { describe, expect, it } from "bun:test";
import { splitStringsBySeparator as splitWordsBySeparator } from ".";

describe("2788. Split Strings by Separator", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			splitWordsBySeparator(["one.two.three", "four.five", "six"], "."),
		).toEqual(["one", "two", "three", "four", "five", "six"]);
		expect(splitWordsBySeparator(["$easy$", "$problem$"], "$")).toEqual([
			"easy",
			"problem",
		]);
		expect(splitWordsBySeparator(["|||"], "|")).toEqual([]);
	});
});
