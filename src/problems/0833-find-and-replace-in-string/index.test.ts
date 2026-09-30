import { describe, expect, it } from "bun:test";
import { findAndReplaceInString as findReplaceString } from ".";

describe("833. Find And Replace in String", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findReplaceString("abcd", [0, 2], ["a", "cd"], ["eee", "ffff"]),
		).toBe("eeebffff");
		expect(
			findReplaceString("abcd", [0, 2], ["ab", "ec"], ["eee", "ffff"]),
		).toBe("eeecd");
	});

	it("uses the original indices regardless of the operations' order", () => {
		expect(
			findReplaceString(
				"vmokgggqzp",
				[3, 5, 1],
				["kg", "ggq", "mo"],
				["s", "so", "bfr"],
			),
		).toBe("vbfrssozp");
	});
});
