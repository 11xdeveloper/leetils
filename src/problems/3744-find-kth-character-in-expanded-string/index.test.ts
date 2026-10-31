import { describe, expect, it } from "bun:test";
import { findKthCharacterInExpandedString as kthCharacter } from ".";

const expand = (s: string) =>
	s
		.split(" ")
		.map((word) => [...word].map((c, i) => c.repeat(i + 1)).join(""))
		.join(" ");

describe("3744. Find Kth Character in Expanded String", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthCharacter("hello world", 0)).toBe("h");
		expect(kthCharacter("hello world", 15)).toBe(" ");
	});

	it("matches building the expansion", () => {
		const s = "ab cde f";
		const expanded = expand(s);
		for (let k = 0; k < expanded.length; k++)
			expect(kthCharacter(s, k)).toBe(expanded.charAt(k));
	});
});
