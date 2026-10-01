import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeAllOccurrencesOfASubstring as removeOccurrences } from ".";

describe("1910. Remove All Occurrences of a Substring", () => {
	it("solves the examples from the problem statement", () => {
		expect(removeOccurrences("daabcbaabcbc", "abc")).toBe("dab");
		expect(removeOccurrences("axxxxyyyyb", "xy")).toBe("ab");
	});

	it("matches removing the leftmost occurrence repeatedly on random inputs", () => {
		const random = createRandom(1910);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 15), "ab");
			const part = random.string(random.int(1, 3), "ab");
			let expected = s;
			while (expected.includes(part)) expected = expected.replace(part, "");
			expect(removeOccurrences(s, part)).toBe(expected);
		}
	});
});
