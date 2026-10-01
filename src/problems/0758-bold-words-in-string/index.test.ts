import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { addBoldTagInString } from "../0616-add-bold-tag-in-string";
import { boldWordsInString as boldWords } from ".";

describe("758. Bold Words in String", () => {
	it("solves the examples from the problem statement", () => {
		expect(boldWords(["ab", "bc"], "aabcd")).toBe("a<b>abc</b>d");
		expect(boldWords(["ab", "cb"], "aabcd")).toBe("a<b>ab</b>cd");
	});

	it("agrees with Add Bold Tag in String, the same problem with the arguments swapped", () => {
		const random = createRandom(758);
		for (let run = 0; run < 500; run++) {
			const s = random.string(random.int(1, 15), "abc");
			const words = Array.from({ length: random.int(0, 4) }, () =>
				random.string(random.int(1, 3), "abc"),
			);
			expect(boldWords(words, s)).toBe(addBoldTagInString(s, words));
		}
	});
});
