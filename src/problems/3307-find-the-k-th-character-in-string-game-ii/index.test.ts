import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheKThCharacterInStringGameII as kthCharacter } from ".";

describe("3307. Find the K-th Character in String Game II", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthCharacter(5, [0, 0, 0])).toBe("a");
		expect(kthCharacter(10, [0, 1, 0, 1])).toBe("b");
	});

	it("matches building the word", () => {
		const random = createRandom(3307);
		for (let run = 0; run < 50; run++) {
			const operations = random.array(9, 0, 1);
			let word = "a";
			for (const op of operations)
				word += op
					? [...word]
							.map((c) =>
								String.fromCharCode(97 + ((c.charCodeAt(0) - 96) % 26)),
							)
							.join("")
					: word;
			for (let k = 1; k <= word.length; k += 7)
				expect(kthCharacter(k, operations)).toBe(word.charAt(k - 1));
		}
	});

	it("handles k up to 10^14", () => {
		expect(kthCharacter(1e14, new Array<number>(47).fill(1))).toMatch(
			/^[a-z]$/,
		);
	});
});
