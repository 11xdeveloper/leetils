import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutationsII } from "../0047-permutations-ii";
import { rearrangeStringKDistanceApart as rearrange } from ".";

const isValid = (text: string, k: number): boolean =>
	[...text].every(
		(char, i) => !text.slice(Math.max(0, i - k + 1), i).includes(char),
	);

const sameLetters = (a: string, b: string): boolean =>
	[...a].sort().join("") === [...b].sort().join("");

/** Whether any rearrangement works. */
const possible = (s: string, k: number): boolean =>
	permutationsII([...s].map((c) => c.charCodeAt(0))).some((codes) =>
		isValid(String.fromCharCode(...codes), k),
	);

describe("358. Rearrange String k Distance Apart", () => {
	it("solves the examples from the problem statement", () => {
		expect(isValid(rearrange("aabbcc", 3), 3)).toBeTrue();
		expect(rearrange("aaabc", 3)).toBe("");
		const third = rearrange("aaadbbcc", 2);
		expect(isValid(third, 2) && sameLetters(third, "aaadbbcc")).toBeTrue();
	});

	it("returns the string unchanged when k is 0 or 1", () => {
		expect(rearrange("aaab", 0)).toBe("aaab");
		expect(rearrange("aaab", 1)).toBe("aaab");
	});

	it("returns a valid rearrangement exactly when one exists, on random inputs", () => {
		const random = createRandom(358);
		for (let run = 0; run < 300; run++) {
			const s = random.string(random.int(1, 7), "aabc");
			const k = random.int(0, 4);
			const result = rearrange(s, k);
			if (possible(s, k)) {
				expect(sameLetters(result, s)).toBeTrue();
				expect(isValid(result, k)).toBeTrue();
			} else {
				expect(result).toBe("");
			}
		}
	});
});
