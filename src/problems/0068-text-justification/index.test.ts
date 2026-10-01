import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { textJustification } from ".";

describe("68. Text Justification", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			textJustification(
				["This", "is", "an", "example", "of", "text", "justification."],
				16,
			),
		).toEqual(["This    is    an", "example  of text", "justification.  "]);
		expect(
			textJustification(
				["What", "must", "be", "acknowledgment", "shall", "be"],
				16,
			),
		).toEqual(["What   must   be", "acknowledgment  ", "shall be        "]);
		expect(
			textJustification(
				[
					"Science",
					"is",
					"what",
					"we",
					"understand",
					"well",
					"enough",
					"to",
					"explain",
					"to",
					"a",
					"computer.",
					"Art",
					"is",
					"everything",
					"else",
					"we",
					"do",
				],
				20,
			),
		).toEqual([
			"Science  is  what we",
			"understand      well",
			"enough to explain to",
			"a  computer.  Art is",
			"everything  else  we",
			"do                  ",
		]);
	});

	it("handles words exactly as wide as a line", () => {
		expect(textJustification(["abc", "de"], 3)).toEqual(["abc", "de "]);
	});

	it("keeps the words in order, with lines of the right width, on random inputs", () => {
		const random = createRandom(68);
		for (let run = 0; run < 300; run++) {
			const maxWidth = random.int(5, 20);
			const words = Array.from({ length: random.int(1, 12) }, () =>
				random.string(random.int(1, maxWidth), "abc"),
			);
			const lines = textJustification(words, maxWidth);
			for (const line of lines) expect(line).toHaveLength(maxWidth);
			expect(lines.join(" ").split(/ +/).filter(Boolean)).toEqual(words);
			// Every line but the last is as full as it can be.
			for (const [i, line] of lines.slice(0, -1).entries()) {
				const nextWord = lines[i + 1]?.trim().split(/ +/)[0] ?? "";
				const used = line.trim().split(/ +/).join(" ").length;
				expect(used + 1 + nextWord.length).toBeGreaterThan(maxWidth);
			}
		}
	});
});
