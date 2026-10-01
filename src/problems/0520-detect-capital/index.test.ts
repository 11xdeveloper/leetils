import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { detectCapital as detectCapitalUse } from ".";

describe("520. Detect Capital", () => {
	it("solves the examples from the problem statement", () => {
		expect(detectCapitalUse("USA")).toBeTrue();
		expect(detectCapitalUse("FlaG")).toBeFalse();
	});

	it("accepts the three allowed patterns and nothing else", () => {
		for (const word of ["leetcode", "Google", "G", "g", "GG"])
			expect(detectCapitalUse(word)).toBeTrue();
		for (const word of ["gG", "ggG", "GgG", "gGG"])
			expect(detectCapitalUse(word)).toBeFalse();
	});

	it("matches a regular expression on random inputs", () => {
		const random = createRandom(520);
		for (let run = 0; run < 1000; run++) {
			const word = random.string(random.int(1, 6), "aA");
			expect(detectCapitalUse(word)).toBe(
				/^([A-Z]+|[a-z]+|[A-Z][a-z]+)$/.test(word),
			);
		}
	});
});
