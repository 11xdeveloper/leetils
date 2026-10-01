import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lengthOfLastWord } from ".";

const bySplitting = (s: string): number =>
	s.trim().split(/ +/).at(-1)?.length ?? 0;

describe("58. Length of Last Word", () => {
	it("solves the examples from the problem statement", () => {
		expect(lengthOfLastWord("Hello World")).toBe(5);
		expect(lengthOfLastWord("   fly me   to   the moon  ")).toBe(4);
		expect(lengthOfLastWord("luffy is still joyboy")).toBe(6);
	});

	it("handles a single word, with or without spaces around it", () => {
		expect(lengthOfLastWord("a")).toBe(1);
		expect(lengthOfLastWord("  word  ")).toBe(4);
	});

	it("matches splitting on spaces on random inputs", () => {
		const random = createRandom(58);
		for (let run = 0; run < 500; run++) {
			const s = `${random.string(random.int(0, 15), "ab  ")}a${random.string(random.int(0, 5), "b ")}`;
			expect(lengthOfLastWord(s)).toBe(bySplitting(s));
		}
	});
});
