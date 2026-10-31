import { describe, expect, it } from "bun:test";
import { findTheKThCharacterInStringGameI as kthCharacter } from ".";

describe("3304. Find the K-th Character in String Game I", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthCharacter(5)).toBe("b");
		expect(kthCharacter(10)).toBe("c");
	});

	it("matches building the word", () => {
		let word = "a";
		while (word.length < 500)
			word += [...word]
				.map((c) => String.fromCharCode(97 + ((c.charCodeAt(0) - 96) % 26)))
				.join("");
		for (let k = 1; k <= 500; k++)
			expect(kthCharacter(k)).toBe(word.charAt(k - 1));
	});
});
