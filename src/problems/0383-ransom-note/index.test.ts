import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { ransomNote } from ".";

const byCounting = (note: string, magazine: string): boolean =>
	[...new Set(note)].every(
		(c) =>
			[...note].filter((x) => x === c).length <=
			[...magazine].filter((x) => x === c).length,
	);

describe("383. Ransom Note", () => {
	it("solves the examples from the problem statement", () => {
		expect(ransomNote("a", "b")).toBeFalse();
		expect(ransomNote("aa", "ab")).toBeFalse();
		expect(ransomNote("aa", "aab")).toBeTrue();
	});

	it("matches comparing letter counts on random inputs", () => {
		const random = createRandom(383);
		for (let run = 0; run < 1000; run++) {
			const note = random.string(random.int(1, 6), "abc");
			const magazine = random.string(random.int(1, 10), "abc");
			expect(ransomNote(note, magazine)).toBe(byCounting(note, magazine));
		}
	});
});
