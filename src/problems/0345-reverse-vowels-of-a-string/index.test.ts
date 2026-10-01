import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { reverseVowelsOfAString as reverseVowels } from ".";

const byCollecting = (s: string): string => {
	const vowels = [...s].filter((c) => "aeiouAEIOU".includes(c));
	return [...s]
		.map((c) => ("aeiouAEIOU".includes(c) ? (vowels.pop() ?? c) : c))
		.join("");
};

describe("345. Reverse Vowels of a String", () => {
	it("solves the examples from the problem statement", () => {
		expect(reverseVowels("IceCreAm")).toBe("AceCreIm");
		expect(reverseVowels("leetcode")).toBe("leotcede");
	});

	it("leaves strings without vowels unchanged", () => {
		expect(reverseVowels("rhythm")).toBe("rhythm");
	});

	it("matches collecting and replacing the vowels on random inputs", () => {
		const random = createRandom(345);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 15), "aAebcU .");
			expect(reverseVowels(s)).toBe(byCollecting(s));
		}
	});
});
