import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findSmallestLetterGreaterThanTarget as nextGreatestLetter } from ".";

describe("744. Find Smallest Letter Greater Than Target", () => {
	it("solves the examples from the problem statement", () => {
		expect(nextGreatestLetter(["c", "f", "j"], "a")).toBe("c");
		expect(nextGreatestLetter(["c", "f", "j"], "c")).toBe("f");
		expect(nextGreatestLetter(["x", "x", "y", "y"], "z")).toBe("x");
	});

	it("matches a linear scan on random inputs", () => {
		const random = createRandom(744);
		for (let run = 0; run < 1000; run++) {
			const letters = [...random.string(random.int(2, 10), "abcdef")].sort();
			const target = random.string(1, "abcdefg");
			expect(nextGreatestLetter(letters, target)).toBe(
				letters.find((letter) => letter > target) ?? letters[0] ?? "",
			);
		}
	});
});
