import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfStringGroupsThroughTransformations as minimumGroups } from ".";

/** Describes words by every rotation directly. */
const byBruteForce = (words: string[]): number => {
	const smallest = (s: string) => {
		let best = s;
		for (let i = 1; i < s.length; i++) {
			const r = s.slice(i) + s.slice(0, i);
			if (r < best) best = r;
		}
		return best;
	};
	return new Set(
		words.map((w) => {
			const even = [...w].filter((_, i) => i % 2 === 0).join("");
			const odd = [...w].filter((_, i) => i % 2 === 1).join("");
			return `${w.length}|${smallest(even)}|${smallest(odd)}`;
		}),
	).size;
};

describe("3999. Minimum Number of String Groups Through Transformations", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumGroups(["ntgwz", "zwntg"])).toBe(1);
		expect(minimumGroups(["abc", "cab", "bac", "acb", "bca", "cba"])).toBe(3);
		expect(
			minimumGroups(["leet", "abb", "bab", "deed", "edde", "code", "bba"]),
		).toBe(5);
	});

	it("matches trying every rotation on random words", () => {
		const random = createRandom(3999);
		for (let run = 0; run < 200; run++) {
			const words = Array.from({ length: random.int(1, 8) }, () =>
				random.string(random.int(1, 6), "ab"),
			);
			expect(minimumGroups(words)).toBe(byBruteForce(words));
		}
	});
});
