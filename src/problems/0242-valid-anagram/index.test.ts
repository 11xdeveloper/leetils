import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { validAnagram } from ".";

const bySorting = (s: string, t: string): boolean =>
	[...s].sort().join("") === [...t].sort().join("");

describe("242. Valid Anagram", () => {
	it("solves the examples from the problem statement", () => {
		expect(validAnagram("anagram", "nagaram")).toBeTrue();
		expect(validAnagram("rat", "car")).toBeFalse();
	});

	it("rejects strings of different lengths", () => {
		expect(validAnagram("a", "aa")).toBeFalse();
	});

	it("handles Unicode characters, as the follow-up asks", () => {
		expect(validAnagram("héllo😀", "😀olléh")).toBeTrue();
		expect(validAnagram("😀", "😁")).toBeFalse();
	});

	it("matches sorting on random inputs", () => {
		const random = createRandom(242);
		for (let run = 0; run < 1000; run++) {
			const s = random.string(random.int(1, 8), "abc");
			const t = random.string(s.length, "abc");
			expect(validAnagram(s, t)).toBe(bySorting(s, t));
		}
	});
});
