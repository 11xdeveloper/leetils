import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reverseWordsInAStringII } from ".";

const reverseWords = (text: string): string => {
	const s = [...text];
	expect(reverseWordsInAStringII(s)).toBeUndefined();
	return s.join("");
};

describe("186. Reverse Words in a String II", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverseWords("the sky is blue")).toBe("blue is sky the");
		expect(reverseWords("a")).toBe("a");
	});

	it("keeps single-letter words and digits", () => {
		expect(reverseWords("a b 1")).toBe("1 b a");
	});

	it("matches splitting and joining on random sentences", () => {
		const random = createRandom(186);
		for (let run = 0; run < 500; run++) {
			const words = Array.from({ length: random.int(1, 6) }, () =>
				random.string(random.int(1, 5), "aB3"),
			);
			expect(reverseWords(words.join(" "))).toBe(words.toReversed().join(" "));
		}
	});
});
