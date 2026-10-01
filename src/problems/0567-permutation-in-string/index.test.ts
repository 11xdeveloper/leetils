import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { permutationInString as checkInclusion } from ".";

const sorted = (text: string): string => [...text].sort().join("");

describe("567. Permutation in String", () => {
	it("solves the examples from the problem statement", () => {
		expect(checkInclusion("ab", "eidbaooo")).toBeTrue();
		expect(checkInclusion("ab", "eidboaoo")).toBeFalse();
	});

	it("returns false when s1 is longer than s2", () => {
		expect(checkInclusion("abc", "ab")).toBeFalse();
	});

	it("matches sorting every window on random inputs", () => {
		const random = createRandom(567);
		for (let run = 0; run < 1000; run++) {
			const s1 = random.string(random.int(1, 4), "abc");
			const s2 = random.string(random.int(1, 12), "abc");
			const expected = Array.from(
				{ length: Math.max(0, s2.length - s1.length + 1) },
				(_, i) => s2.slice(i, i + s1.length),
			).some((window) => sorted(window) === sorted(s1));
			expect(checkInclusion(s1, s2)).toBe(expected);
		}
	});
});
