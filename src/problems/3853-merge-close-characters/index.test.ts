import { describe, expect, it } from "bun:test";
import { mergeCloseCharacters as mergeCharacters } from ".";

describe("3853. Merge Close Characters", () => {
	it("solves the examples from the problem statement", () => {
		expect(mergeCharacters("abca", 3)).toBe("abc");
		expect(mergeCharacters("aabca", 2)).toBe("abca");
		expect(mergeCharacters("yybyzybz", 2)).toBe("ybzybz");
	});
});
