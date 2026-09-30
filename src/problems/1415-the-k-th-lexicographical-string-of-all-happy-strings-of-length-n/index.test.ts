import { describe, expect, it } from "bun:test";
import { stringsUpTo } from "../../testing/random";
import { theKThLexicographicalStringOfAllHappyStringsOfLengthN as getHappyString } from ".";

describe("1415. The k-th Lexicographical String of All Happy Strings of Length n", () => {
	it("solves the examples from the problem statement", () => {
		expect(getHappyString(1, 3)).toBe("c");
		expect(getHappyString(1, 4)).toBe("");
		expect(getHappyString(3, 9)).toBe("cab");
	});

	it("matches listing every happy string up to length 7", () => {
		const all = stringsUpTo(["a", "b", "c"], 7).filter(
			(s) => s !== "" && !/(.)\1/.test(s),
		);
		for (let n = 1; n <= 7; n++) {
			const happy = all.filter((s) => s.length === n).sort();
			for (let k = 1; k <= 100; k++)
				expect(getHappyString(n, k)).toBe(happy[k - 1] ?? "");
		}
	});
});
