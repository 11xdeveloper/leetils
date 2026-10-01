import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shiftingLetters } from ".";

describe("848. Shifting Letters", () => {
	it("solves the examples from the problem statement", () => {
		expect(shiftingLetters("abc", [3, 5, 9])).toBe("rpl");
		expect(shiftingLetters("aaa", [1, 2, 3])).toBe("gfd");
	});

	it("matches applying each shift in turn on random inputs", () => {
		const random = createRandom(848);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 10), "abcxyz");
			const shifts = random.array(s.length, 0, 10 ** 9);
			const letters = [...s].map((char) => char.charCodeAt(0) - 97);
			for (const [i, shift] of shifts.entries())
				for (let j = 0; j <= i; j++)
					letters[j] = ((letters[j] ?? 0) + shift) % 26;
			expect(shiftingLetters(s, shifts)).toBe(
				letters.map((letter) => String.fromCharCode(letter + 97)).join(""),
			);
		}
	});
});
